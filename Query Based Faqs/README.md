# Query-Based FAQ Generator

A modern web application that allows users to upload documents and generate various types of summaries, FAQs, and insights using AI-powered prompts.

## Features

### 📄 Document Processing
- Upload TXT, PDF, DOC, and DOCX files
- Drag and drop file upload
- Text extraction and processing
- File validation and error handling

### 🤖 AI-Powered Content Generation
- **Summarization & Key Insights**
  - Executive Summary
  - Study Notes
  - Argument Outline
  - Short Summary

- **FAQ Generation**
  - Comprehensive FAQ (10-15 questions)
  - Policy FAQ (8 questions)
  - Technical Q&A (5 questions)
  - Comparison FAQ (3 questions)

- **Specific Q&A and Verification**
  - Find Specific Data
  - Clarify Terms
  - Verify Details
  - Source Tracking

- **Actionable Content Creation**
  - Email Drafts
  - Presentation Preparation
  - Rewrite & Simplify

### 📊 Export & Sharing
- Export to CSV/Excel format
- Copy to clipboard
- Download generated content

## Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- A modern web browser

### Installation & Running

1. **Clone or download the project files**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   The application will automatically open at `http://localhost:3000`

### Alternative: Simple HTTP Server

If you don't have Node.js installed, you can use Python's built-in server:

```bash
# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

Then open `http://localhost:3000` in your browser.

## Usage

1. **Upload a Document**
   - Click the upload area or drag and drop a file
   - Currently supports TXT files (PDF/DOC support requires additional libraries)

2. **Select an AI Tool**
   - Choose from the categorized prompt options
   - Or enter a custom query in the text area

3. **Generate Content**
   - Click "Generate Content" to process your document
   - Wait for the AI to analyze and generate results

4. **Export Results**
   - Copy content to clipboard
   - Export to CSV/Excel format
   - Download the generated content

## File Structure

```
query-based-faq-generator/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── package.json        # Node.js dependencies
└── README.md          # This file
```

## Technical Details

### Current Implementation
- **Frontend**: Pure HTML, CSS, and JavaScript
- **File Processing**: Client-side text extraction
- **AI Simulation**: Mock AI responses (easily replaceable with real AI APIs)
- **Export**: CSV download functionality

### AI Integration
The current version uses simulated AI responses. To integrate with real AI services:

1. **OpenAI API**: Replace the mock functions in `script.js` with OpenAI API calls
2. **Anthropic Claude**: Integrate Claude API for document analysis
3. **Google AI**: Use Google's AI services for text processing

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Customization

### Adding New Prompt Types
1. Add new prompt templates to the `promptTemplates` object in `script.js`
2. Create corresponding generation functions
3. Add UI elements in `index.html` if needed

### Styling
- Modify `styles.css` to change the appearance
- The design is responsive and mobile-friendly
- Uses modern CSS Grid and Flexbox

### File Type Support
To add support for PDF/DOC files:
1. Include libraries like `pdf.js` or `mammoth.js`
2. Update the `extractTextFromFile` function
3. Add proper file type handling

## Limitations

- **Current Version**: Only supports TXT files for text extraction
- **AI Processing**: Uses simulated responses (not real AI)
- **File Size**: Limited to 10MB uploads
- **Browser Storage**: No persistent storage of uploaded files

## Future Enhancements

- [ ] Real AI API integration (OpenAI, Claude, etc.)
- [ ] PDF and DOC file support
- [ ] User authentication and file history
- [ ] Advanced export options (Word, PowerPoint)
- [ ] Batch processing capabilities
- [ ] API endpoint for server-side processing

## License

MIT License - feel free to use and modify as needed.

## Support

For issues or questions, please check the browser console for error messages and ensure all files are properly loaded.

