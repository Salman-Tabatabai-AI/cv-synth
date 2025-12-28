'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  Download, FileJson, Upload, ChevronLeft, ChevronRight, FileText, Palette, ZoomIn, ZoomOut, FolderOpen, Save
} from 'lucide-react';
import { GlobalStyles } from '../lib/utils';
import { initialData, initialStyles, defaultSections, pageSizes, MM_TO_PX } from '../lib/constants';
import { ResumePreview } from '../components/preview/ResumePreview';
import { ContentEditor } from '../components/editor/ContentEditor';
import { DesignEditor } from '../components/editor/DesignEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState('content');
  const [resumeData, setResumeData] = useState(initialData);
  const [activeSection, setActiveSection] = useState('personal');
  const [sectionOrder, setSectionOrder] = useState(defaultSections);
  const [styles, setStyles] = useState(initialStyles);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [zoom, setZoom] = useState(0.85);

  // --- Resizable Sidebar Logic ---
  const [sidebarWidth, setSidebarWidth] = useState(450);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        setSidebarWidth(Math.max(300, Math.min(800, mouseMoveEvent.clientX)));
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  const componentRef = useRef(null);
  const contentLayerRef = useRef(null);
  const fileInputRef = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${resumeData.personal.firstName}_Resume`,
  });

  // --- Page Calculation Logic ---
  useEffect(() => {
    if (contentLayerRef.current) {
      // With CSS columns, content expands horizontally.
      // We measure the full scrollWidth to determine total pages.
      const scrollWidth = contentLayerRef.current.scrollWidth;
      const clientWidth = contentLayerRef.current.clientWidth;

      // Safety check to avoid division by zero or negative
      if (clientWidth > 0) {
        const pages = Math.ceil(scrollWidth / clientWidth);
        setTotalPages(Math.max(1, pages));

        if (currentPage > pages) setCurrentPage(1);
      }
    }
  }, [resumeData, styles, currentPage]); // Re-run when data/styles apply

  const changePage = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleZoom = (direction) => {
    if (direction === 'in' && zoom < 1.5) {
      setZoom(prev => Math.min(prev + 0.1, 1.5));
    } else if (direction === 'out' && zoom > 0.5) {
      setZoom(prev => Math.max(prev - 0.1, 0.5));
    }
  };

  const handleSave = async () => {
    const dataStr = JSON.stringify({ resumeData, sectionOrder, styles }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });

    try {
      if (window.showSaveFilePicker) {
        const handle = await window.showSaveFilePicker({
          suggestedName: `${resumeData.personal.firstName}_Resume.json`,
          types: [{
            description: 'JSON Files',
            accept: { 'application/json': ['.json'] },
          }],
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        alert("File saved successfully!");
      } else {
        // Fallback for browsers without File System Access API
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${resumeData.personal.firstName}_Resume.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error(err);
        alert("Failed to save file.");
      }
    }
  };

  const handleLoadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (imported.resumeData) setResumeData(imported.resumeData);
        if (imported.sectionOrder) setSectionOrder(imported.sectionOrder);
        if (imported.styles) setStyles(prev => ({ ...prev, ...imported.styles }));
        alert("Resume loaded successfully!");
      } catch {
        alert("Error parsing the file.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // --- Data Handlers ---
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, personal: { ...prev.personal, [name]: value } }));
  };

  const handleArrayChange = (section, id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addItem = (section, template) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [{ ...template, id: Date.now() }, ...prev[section]]
    }));
  };

  const removeItem = (section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const moveItem = (section, index, direction) => {
    const items = [...resumeData[section]];
    if (direction === 'up' && index > 0) {
      [items[index], items[index - 1]] = [items[index - 1], items[index]];
    } else if (direction === 'down' && index < items.length - 1) {
      [items[index], items[index + 1]] = [items[index + 1], items[index]];
    }
    setResumeData(prev => ({ ...prev, [section]: items }));
  };

  const moveSection = (index, direction) => {
    const newOrder = [...sectionOrder];
    if (direction === 'up' && index > 0) {
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
    } else if (direction === 'down' && index < newOrder.length - 1) {
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    }
    setSectionOrder(newOrder);
  };

  const reorderItem = (section, oldIndex, newIndex) => {
    setResumeData(prev => {
      const items = [...prev[section]];
      const [moved] = items.splice(oldIndex, 1);
      items.splice(newIndex, 0, moved);
      return { ...prev, [section]: items };
    });
  };

  const updateStyle = (group, key, value) => {
    setStyles(prev => ({
      ...prev,
      [group]: { ...prev[group], [key]: value }
    }));
  };

  const currentPageConfig = pageSizes[styles.pageSize] || pageSizes.a4;
  const pageHeightPx = currentPageConfig.heightMm * MM_TO_PX;

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground">
      <GlobalStyles />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-border px-6 py-3 flex justify-between items-center sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">CV</div>
            <h1 className="font-semibold text-lg hidden sm:block tracking-tight text-slate-800">CV-Synth</h1>
          </div>

          <TabsList className="bg-slate-100/80 p-1 border border-slate-200">
            <TabsTrigger value="content" className="gap-2 px-4">
              <FileText size={14} /> Content
            </TabsTrigger>
            <TabsTrigger value="design" className="gap-2 px-4">
              <Palette size={14} /> Design
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-3">
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="application/json" />
            <Button variant="ghost" size="sm" onClick={handleSave} className="gap-2 text-slate-600">
              <Save size={16} /> <span className="hidden sm:inline">Save</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLoadClick} className="gap-2 text-slate-600">
              <FolderOpen size={16} /> <span className="hidden sm:inline">Load</span>
            </Button>
            <Button onClick={() => handlePrint()} className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-md ml-2 rounded-full px-6">
              <Download size={16} /> Download PDF
            </Button>
          </div>
        </header>

        <main className="flex-1 max-w-[1920px] mx-auto w-full flex overflow-hidden">
          {/* LEFT PANEL */}
          <div
            className="flex-shrink-0 bg-white border-r border-border flex flex-col z-10 shadow-xl shadow-slate-200/50 relative"
            style={{ width: sidebarWidth }}
          >
            <TabsContent value="content" className="h-full m-0 data-[state=inactive]:hidden">
              <ContentEditor
                resumeData={resumeData}
                sectionOrder={sectionOrder}
                activeSection={activeSection}
                handlePersonalChange={handlePersonalChange}
                handleArrayChange={handleArrayChange}
                addItem={addItem}
                removeItem={removeItem}
                moveItem={moveItem}
                reorderItem={reorderItem}
                moveSection={moveSection}
                setActiveSection={setActiveSection}
              />
            </TabsContent>
            <TabsContent value="design" className="h-full m-0 data-[state=inactive]:hidden">
              <DesignEditor
                styles={styles}
                setStyles={setStyles}
                updateStyle={updateStyle}
              />
            </TabsContent>

            {/* Resize Handle */}
            <div
              className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize hover:bg-blue-400/50 active:bg-blue-600 transition-colors z-50 transform translate-x-1/2"
              onMouseDown={startResizing}
            />
          </div>

          {/* --- RIGHT PANEL (Preview) --- */}
          <div className={`flex-1 bg-slate-50/50 flex flex-col items-center p-8 overflow-hidden relative ${isResizing ? 'pointer-events-none select-none' : ''}`}>
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            {/* Top Page Controls */}
            <div className="no-print flex items-center gap-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-slate-200/60 z-10 mb-6">
              <div className="flex items-center gap-1 border-r border-slate-200 pr-3 mr-1">
                <button onClick={() => handleZoom('out')} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition" disabled={zoom <= 0.5}>
                  <ZoomOut size={16} />
                </button>
                <span className="text-xs font-semibold text-slate-500 w-12 text-center">{Math.round(zoom * 100)}%</span>
                <button onClick={() => handleZoom('in')} className="p-1.5 rounded-full hover:bg-slate-100 text-slate-600 transition" disabled={zoom >= 1.5}>
                  <ZoomIn size={16} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => changePage('prev')}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-full hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 transition"
                >
                  <ChevronLeft size={20} />
                </button>

                <span className="text-sm font-semibold text-slate-700 min-w-[60px] text-center font-mono">
                  {currentPage}/{totalPages}
                </span>

                <button
                  onClick={() => changePage('next')}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-full hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent text-slate-600 transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 w-full flex justify-center overflow-auto z-0 custom-scrollbar pb-20">
              <div
                className="origin-top transition-transform duration-300 ease-out"
                style={{ transform: `scale(${zoom})` }}
              >

                {/* VIEWPORT CONTAINER */}
                <div
                  ref={componentRef}
                  className="resume-preview-container bg-white shadow-2xl shadow-slate-400/20 ring-1 ring-slate-900/5"
                  style={{
                    width: currentPageConfig.width,
                    height: currentPageConfig.height,
                    position: 'relative'
                  }}
                >
                  {/* Visual Border for screen only */}
                  {/* <div className="paper-shadow-border absolute inset-0 border-[1px] border-gray-200 pointer-events-none z-20"></div> */}

                  {/* SLIDING CONTENT LAYER */}
                  <div className="resume-viewport w-full h-full overflow-hidden">
                    <style jsx global>{`
                      @media print {
                        .resume-content-layer {
                          height: auto !important;
                          width: 100% !important;
                          columns: auto !important;
                          padding: 0 !important;
                          transform: none !important;
                        }
                      }
                    `}</style>
                    <div
                      ref={contentLayerRef}
                      className="resume-content-layer transition-transform duration-500 ease-in-out will-change-transform"
                      style={{
                        // Pagination Logic: Horizontal Columns
                        height: '100%', // With border-box, this (297mm) - padding (40mm) = printable area (257mm)
                        width: `${currentPageConfig.width}`,
                        columnWidth: `${currentPageConfig.width}`, // Force content into columns of page width
                        columnGap: `${styles.margin * 2}mm`, // Critical: Gap must equal Left+Right margin to push next column to exactly the next "page slot"
                        columnFill: 'auto',

                        // Layout
                        fontFamily: styles.fontFamily,
                        lineHeight: styles.lineHeight,
                        padding: `${styles.margin}mm`, // Padding acts as margin inside the "page frame"

                        // We translate HORIZONTALLY to see the next column (next page)
                        transform: `translateX(-${(currentPage - 1) * 100}%)`
                      }}
                    >
                      <ResumePreview
                        resumeData={resumeData}
                        sectionOrder={sectionOrder}
                        styles={styles}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </Tabs>
    </div>
  );
}
