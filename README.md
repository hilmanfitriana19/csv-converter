# CSV Converter

A powerful and user-friendly web application for converting row-based data into CSV format with various transformation options. Built with Next.js, React, and TypeScript.

## Features

- **Easy Data Conversion**: Convert lists or column-based data into properly formatted CSV files
- **Customizable Output**: Choose from various separators (comma, semicolon, tab, pipe, or custom)
- **Data Transformation Options**:
  - Add prefixes and suffixes to each entry
  - Enclose data in quotes (single, double, or none)
  - Remove duplicate entries
  - Remove line breaks within entries
  - Convert case (uppercase/lowercase)
- **AI-Powered Suggestions**: Intelligent recommendations for data formatting based on your input
- **Privacy-Friendly**: All processing happens in your browser - no data is sent to any server
- **Export Options**: Download your transformed data as a CSV file or copy to clipboard

## Demo

![CSV Converter Demo](https://hyhilman.web.id/csv-converter/logo.png)

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/csv-converter.git
   ```

2. Navigate to the project directory:
   ```bash
   cd csv-converter
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and visit `http://localhost:9002`

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm start
# or
yarn start
```

## Usage

1. Paste your row-based data into the input text area
2. Customize the transformation options as needed:
   - Select your preferred separator
   - Add prefixes/suffixes
   - Choose quote enclosure options
   - Enable data cleaning features
3. View the live preview of your CSV output
4. Download the file or copy to clipboard

## Technologies Used

- **Next.js 15** - React framework for production
- **TypeScript** - Typed superset of JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Reusable component library
- **Lucide React** - Beautiful & consistent icon toolkit
- **React Hook Form** - Performant, flexible forms with easy validation
- **Zod** - TypeScript-first schema declaration and validation library

## Project Structure

```
csv-converter/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   │   ├── ui/           # Shadcn/ui components
│   │   └── ...           # Custom components
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions
├── public/               # Static assets
└── ...
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the excellent component library
- [Lucide](https://lucide.dev/) for the beautiful icons
- All contributors who have helped shape this project

## Contact

Project Link: [https://github.com/your-username/csv-converter](https://github.com/your-username/csv-converter)