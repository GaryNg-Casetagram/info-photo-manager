# Info & Photo Manager

A modern web application built with Node.js and Express for managing information and photos with export functionality.

## Features

- 📸 **Upload & Manage Files**: Support for images (JPG, PNG, GIF) and PDF files
- 📝 **Information Management**: Add, edit, and delete entries with titles, descriptions, and categories
- 🔍 **Advanced Filtering**: Filter by category and date range
- 📦 **Export Functionality**: Export filtered data as ZIP files containing all images and PDFs
- 🎨 **Modern UI**: Beautiful, responsive interface with drag-and-drop file upload
- 💾 **SQLite Database**: Lightweight database for storing metadata

## Installation

1. **Clone or download the project**
   ```bash
   cd info-photo-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

### Adding New Entries
1. Click "Add New Entry" button
2. Fill in the title (required), description, and category
3. Upload files by clicking the upload area or dragging and dropping files
4. Click "Save Entry"

### Managing Entries
- **View**: All entries are displayed in a grid layout
- **Edit**: Click the "Edit" button on any entry
- **Delete**: Click the "Delete" button (with confirmation)
- **Filter**: Use the category dropdown and date range filters

### Exporting Data
1. Apply any desired filters (category, date range)
2. Click "Export Data" button
3. A ZIP file will be downloaded containing:
   - JSON files with entry information
   - All associated images and PDFs organized by entry

## File Structure

```
info-photo-manager/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── public/
│   └── index.html     # Web interface
├── uploads/           # Uploaded files (created automatically)
└── info_photos.db     # SQLite database (created automatically)
```

## API Endpoints

- `GET /` - Main web interface
- `GET /api/entries` - Get all entries (with optional filtering)
- `GET /api/categories` - Get all categories
- `POST /api/entries` - Create new entry
- `PUT /api/entries/:id` - Update entry
- `DELETE /api/entries/:id` - Delete entry
- `GET /api/export` - Export filtered data as ZIP

## Configuration

- **Port**: Default is 3000, set `PORT` environment variable to change
- **File Size Limit**: 10MB per file
- **Supported Formats**: JPG, PNG, GIF, PDF
- **Database**: SQLite (no additional setup required)

## Development

For development with auto-restart:
```bash
npm run dev
```

## Requirements

- Node.js 14+ 
- npm or yarn

## License

MIT License
