const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const archiver = require('archiver');
const moment = require('moment');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Allow images and PDFs
        const allowedTypes = /jpeg|jpg|png|gif|pdf/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images and PDF files are allowed!'));
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Initialize SQLite database
const db = new sqlite3.Database('info_photos.db');

// Create tables
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        category TEXT,
        amount DECIMAL(10,2),
        expense_date DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        entry_id INTEGER,
        filename TEXT NOT NULL,
        original_name TEXT NOT NULL,
        file_type TEXT NOT NULL,
        file_size INTEGER,
        upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (entry_id) REFERENCES entries (id)
    )`);

    // Add amount column to existing entries table if it doesn't exist
    db.run(`ALTER TABLE entries ADD COLUMN amount DECIMAL(10,2)`, (err) => {
        // Ignore error if column already exists
    });

    // Add expense_date column to existing entries table if it doesn't exist
    db.run(`ALTER TABLE entries ADD COLUMN expense_date DATETIME`, (err) => {
        // Ignore error if column already exists
    });
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all entries with files
app.get('/api/entries', (req, res) => {
    const { category, startDate, endDate } = req.query;
    let query = `
        SELECT e.*, 
               GROUP_CONCAT(f.filename) as filenames,
               GROUP_CONCAT(f.original_name) as original_names,
               GROUP_CONCAT(f.file_type) as file_types
        FROM entries e
        LEFT JOIN files f ON e.id = f.entry_id
    `;
    
    const conditions = [];
    const params = [];
    
    if (category) {
        conditions.push('e.category = ?');
        params.push(category);
    }
    
    if (startDate) {
        conditions.push('e.created_at >= ?');
        params.push(startDate);
    }
    
    if (endDate) {
        conditions.push('e.created_at <= ?');
        params.push(endDate + ' 23:59:59');
    }
    
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' GROUP BY e.id ORDER BY e.created_at DESC';
    
    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        const entries = rows.map(row => ({
            ...row,
            files: row.filenames ? row.filenames.split(',').map((filename, index) => ({
                filename: filename,
                original_name: row.original_names.split(',')[index],
                file_type: row.file_types.split(',')[index]
            })) : []
        }));
        
        res.json(entries);
    });
});

// Get categories
app.get('/api/categories', (req, res) => {
    db.all('SELECT DISTINCT category FROM entries WHERE category IS NOT NULL', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows.map(row => row.category));
    });
});

// Get expense categories
app.get('/api/expense-categories', (req, res) => {
    const expenseCategories = [
        'Travel & Transportation',
        'Meals & Entertainment',
        'Office Supplies',
        'Professional Development',
        'Software & Subscriptions',
        'Communication (Phone/Internet)',
        'Equipment & Hardware',
        'Marketing & Advertising',
        'Legal & Professional Services',
        'Utilities & Rent',
        'Insurance',
        'Training & Conferences',
        'Client Entertainment',
        'Business Development',
        'Other Business Expenses'
    ];
    res.json(expenseCategories);
});

// Create new entry
app.post('/api/entries', upload.array('files', 10), (req, res) => {
    const { title, description, category, amount, expense_date } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    
    db.run(
        'INSERT INTO entries (title, description, category, amount, expense_date) VALUES (?, ?, ?, ?, ?)',
        [title, description, category, amount || null, expense_date || null],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            
            const entryId = this.lastID;
            
            // Save file information
            if (req.files && req.files.length > 0) {
                const fileInserts = req.files.map(file => {
                    return new Promise((resolve, reject) => {
                        db.run(
                            'INSERT INTO files (entry_id, filename, original_name, file_type, file_size) VALUES (?, ?, ?, ?, ?)',
                            [entryId, file.filename, file.originalname, file.mimetype, file.size],
                            function(err) {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                });
                
                Promise.all(fileInserts)
                    .then(() => {
                        res.json({ id: entryId, message: 'Entry created successfully' });
                    })
                    .catch(err => {
                        res.status(500).json({ error: err.message });
                    });
            } else {
                res.json({ id: entryId, message: 'Entry created successfully' });
            }
        }
    );
});

// Update entry
app.put('/api/entries/:id', upload.array('files', 10), (req, res) => {
    const { id } = req.params;
    const { title, description, category, amount, expense_date } = req.body;
    
    db.run(
        'UPDATE entries SET title = ?, description = ?, category = ?, amount = ?, expense_date = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [title, description, category, amount || null, expense_date || null, id],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            
            // Add new files if any
            if (req.files && req.files.length > 0) {
                const fileInserts = req.files.map(file => {
                    return new Promise((resolve, reject) => {
                        db.run(
                            'INSERT INTO files (entry_id, filename, original_name, file_type, file_size) VALUES (?, ?, ?, ?, ?)',
                            [id, file.filename, file.originalname, file.mimetype, file.size],
                            function(err) {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                });
                
                Promise.all(fileInserts)
                    .then(() => {
                        res.json({ message: 'Entry updated successfully' });
                    })
                    .catch(err => {
                        res.status(500).json({ error: err.message });
                    });
            } else {
                res.json({ message: 'Entry updated successfully' });
            }
        }
    );
});

// Delete entry
app.delete('/api/entries/:id', (req, res) => {
    const { id } = req.params;
    
    // First, get all files for this entry
    db.all('SELECT filename FROM files WHERE entry_id = ?', [id], (err, files) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        // Delete files from filesystem
        files.forEach(file => {
            const filePath = path.join(uploadsDir, file.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
        
        // Delete from database
        db.run('DELETE FROM entries WHERE id = ?', [id], function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ message: 'Entry deleted successfully' });
        });
    });
});

// Export entries as ZIP
app.get('/api/export', (req, res) => {
    const { startDate, endDate, category } = req.query;
    
    let query = `
        SELECT e.*, f.filename, f.original_name, f.file_type
        FROM entries e
        LEFT JOIN files f ON e.id = f.entry_id
    `;
    
    const conditions = [];
    const params = [];
    
    if (category) {
        conditions.push('e.category = ?');
        params.push(category);
    }
    
    if (startDate) {
        conditions.push('e.created_at >= ?');
        params.push(startDate);
    }
    
    if (endDate) {
        conditions.push('e.created_at <= ?');
        params.push(endDate + ' 23:59:59');
    }
    
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY e.created_at DESC';
    
    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        // Create ZIP archive
        const archive = archiver('zip', { zlib: { level: 9 } });
        
        res.attachment(`export_${moment().format('YYYY-MM-DD_HH-mm-ss')}.zip`);
        archive.pipe(res);
        
        // Group entries
        const entriesMap = new Map();
        rows.forEach(row => {
            if (!entriesMap.has(row.id)) {
                entriesMap.set(row.id, {
                    ...row,
                    files: []
                });
            }
            if (row.filename) {
                entriesMap.get(row.id).files.push({
                    filename: row.filename,
                    original_name: row.original_name,
                    file_type: row.file_type
                });
            }
        });
        
        // Add entries to ZIP
        entriesMap.forEach((entry, entryId) => {
            const entryDir = `entry_${entryId}_${entry.title.replace(/[^a-zA-Z0-9]/g, '_')}`;
            
            // Add entry info as JSON
            const entryInfo = {
                id: entry.id,
                title: entry.title,
                description: entry.description,
                category: entry.category,
                created_at: entry.created_at,
                updated_at: entry.updated_at
            };
            
            archive.append(JSON.stringify(entryInfo, null, 2), { name: `${entryDir}/entry_info.json` });
            
            // Add files
            entry.files.forEach(file => {
                const filePath = path.join(uploadsDir, file.filename);
                if (fs.existsSync(filePath)) {
                    archive.file(filePath, { name: `${entryDir}/files/${file.original_name}` });
                }
            });
        });
        
        archive.finalize();
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
        }
    }
    res.status(500).json({ error: error.message });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Database connection closed.');
        process.exit(0);
    });
});
