import React from 'react';

export function parseStyles(text) {
    return text.replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>').replace(/<i>(.*?)<\/i>/g, '<em>$1</em>');
}

export function FormattedText({ text }) {
    if (!text) return null;
    const lines = text.split('\n');
    const elements = [];
    let currentList = [];

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
            currentList.push(trimmed.substring(1).trim());
        } else {
            if (currentList.length > 0) {
                elements.push(
                    <ul key={`list-${index}`} className="list-disc ml-5 mb-2 pl-1 space-y-1">
                        {currentList.map((li, i) => <li key={i} dangerouslySetInnerHTML={{ __html: parseStyles(li) }} />)}
                    </ul>
                );
                currentList = [];
            }
            if (trimmed) elements.push(<p key={`p-${index}`} className="mb-1" dangerouslySetInnerHTML={{ __html: parseStyles(line) }} />);
        }
    });

    if (currentList.length > 0) {
        elements.push(
            <ul key="list-end" className="list-disc ml-5 mb-2 pl-1 space-y-1">
                {currentList.map((li, i) => <li key={i} dangerouslySetInnerHTML={{ __html: parseStyles(li) }} />)}
            </ul>
        );
    }

    return <div>{elements}</div>;
}

export const GlobalStyles = () => (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Merriweather:wght@300;400;700&family=Open+Sans:wght@400;600&family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;700&display=swap');
      
      /* PREVIEW MODE (Screen) */
      .paper-shadow-border {
        box-shadow: 0 0 0 1px #e5e7eb, 0 10px 30px rgba(0,0,0,0.1);
      }
  
      /* PRINT OVERRIDES (Paper) */
      @media print {
        @page {
          size: auto;
          /* The printer handles the 20mm margin physically */
          margin: 20mm !important; 
        }
        
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          background: white;
        }
        
        .no-print {
          display: none !important;
        }
  
        /* UNWRAP FOR PRINT */
        .resume-preview-container {
          width: 100% !important;
          height: auto !important;
          box-shadow: none !important;
          background: transparent !important;
          margin: 0 !important;
          border: none !important;
          /* CRITICAL: Remove padding because @page margin handles it now */
          padding: 0mm !important; 
          overflow: visible !important;
          display: block !important;
        }
  
        .resume-viewport {
          height: auto !important;
          overflow: visible !important;
        }
  
        /* Reset transforms for print so content flows naturally */
        .resume-content-layer {
          transform: none !important;
          position: static !important;
        }
        
        .break-inside-avoid {
          break-inside: avoid;
        }
      }
    `}</style>
);
