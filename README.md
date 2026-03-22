# AI Profile Photo Template

An AI-powered WordPress plugin to create optimized profile photos for various social media platforms.

## Features

- **AI Background Removal**: Automatically remove backgrounds using machine learning (ml5.js)
- **Auto Enhancement**: Improve image quality with automatic adjustments
- **Multi-Platform Support**: Optimized sizes for Instagram (1080x1080), LinkedIn (400x400), Twitter (500x500), Facebook (800x800)
- **Custom Borders**: Add customizable borders and frames
- **Drag & Drop Upload**: Easy image uploading interface
- **High-Quality Export**: Download images in PNG format with high resolution
- **Responsive Design**: Works on mobile and desktop

## Installation

1. Download the plugin files as a ZIP from this repository
2. Upload the `ai-profile-photo-template` folder to your `/wp-content/plugins/` directory
3. Activate the plugin through the 'Plugins' menu in WordPress
4. Use the shortcode `[ai_profile_tool]` on any page or post

## Usage

1. Add the shortcode `[ai_profile_tool]` to any WordPress page or post
   - Optional example with related resources: `[ai_profile_tool tool_url="https://example.com/my-tool" prompt_template="Write a friendly teacher bio for LinkedIn."]`
2. Upload your image by dragging and dropping or clicking the upload area
3. Select your target social media platform (Instagram, LinkedIn, etc.)
4. Enable AI features (background removal) if desired
5. Customize borders if needed
6. Click "Download" to save your optimized image

## Requirements

- WordPress 5.0 or higher
- Modern web browser with JavaScript enabled
- Internet connection (for AI model loading on first use)

## Technical Details

- Uses ml5.js (TensorFlow.js wrapper) for AI background removal
- Canvas API for image manipulation and resizing
- All processing happens in the browser - no data sent to external servers

## Privacy

All image processing happens locally in your browser. Images are not uploaded to external servers for processing.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is licensed under the GPL v2 or later.

## Author

Created by nuzwa269 (https://github.com/nuzwa269)
