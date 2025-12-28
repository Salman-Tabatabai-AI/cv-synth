'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  Download, FileJson, Upload, ChevronLeft, ChevronRight
} from 'lucide-react';
import { GlobalStyles } from '../lib/utils';
import { initialData, initialStyles, defaultSections, pageSizes, MM_TO_PX } from '../lib/constants';
import { EditorPanel } from '../components/editor/EditorPanel';
import { ResumePreview } from '../components/preview/ResumePreview';

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState('content');
  const [resumeData, setResumeData] = useState(initialData);
  const [activeSection, setActiveSection] = useState('personal');
  const [sectionOrder, setSectionOrder] = useState(defaultSections);
  const [styles, setStyles] = useState(initialStyles);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
      const contentHeightPx = contentLayerRef.current.scrollHeight;
      const pageSize = pageSizes[styles.pageSize];

      const printableHeightPx = pageSize.printableHeightMm * MM_TO_PX;

      const pages = Math.ceil((contentHeightPx + 5) / printableHeightPx);
      setTotalPages(Math.max(1, pages));

      if (currentPage > pages) setCurrentPage(1);
    }
  }, [resumeData, styles, currentPage]);

  const changePage = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify({ resumeData, sectionOrder, styles }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resumeData.personal.firstName}_Resume.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportClick = () => {
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

  const updateStyle = (group, key, value) => {
    setStyles(prev => ({
      ...prev,
      [group]: { ...prev[group], [key]: value }
    }));
  };

  const currentPageConfig = pageSizes[styles.pageSize] || pageSizes.a4;
  const currentPrintableHeightPx = currentPageConfig.printableHeightMm * MM_TO_PX;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-800">
      <GlobalStyles />

      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">R</div>
          <h1 className="font-semibold text-lg hidden sm:block">Resume Builder</h1>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button onClick={() => setActiveTab('content')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${activeTab === 'content' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Content</button>
          <button onClick={() => setActiveTab('design')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${activeTab === 'design' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Design</button>
        </div>

        <div className="flex items-center gap-3">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="application/json" />
          <button onClick={handleExport} className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium transition" title="Save to File">
            <FileJson size={16} /> <span className="hidden sm:inline">Export JSON</span>
          </button>
          <button onClick={handleImportClick} className="flex items-center gap-1 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded text-sm font-medium transition" title="Load from File">
            <Upload size={16} /> <span className="hidden sm:inline">Import JSON</span>
          </button>
          <button onClick={() => handlePrint()} className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full transition shadow-sm ml-2">
            <Download size={16} /> <span className="hidden sm:inline">Download PDF</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-[1800px] mx-auto w-full flex overflow-hidden h-[calc(100vh-65px)]">
        {/* LEFT PANEL */}
        <EditorPanel
          activeTab={activeTab}
          resumeData={resumeData}
          sectionOrder={sectionOrder}
          styles={styles}
          activeSection={activeSection}
          handlePersonalChange={handlePersonalChange}
          handleArrayChange={handleArrayChange}
          addItem={addItem}
          removeItem={removeItem}
          moveItem={moveItem}
          moveSection={moveSection}
          setActiveSection={setActiveSection}
          setStyles={setStyles}
          updateStyle={updateStyle}
        />

        {/* --- RIGHT PANEL (Preview) --- */}
        <div className="flex-1 bg-gray-100 flex flex-col items-center p-8 overflow-hidden relative">

          {/* Top Page Controls */}
          <div className="no-print flex items-center gap-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-gray-200 z-10 mb-4">
            <button
              onClick={() => changePage('prev')}
              disabled={currentPage === 1}
              className="p-1.5 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent text-gray-600 transition"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-sm font-semibold text-gray-700 min-w-[80px] text-center">
              Page {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => changePage('next')}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent text-gray-600 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex-1 w-full flex justify-center overflow-hidden">
            <div className="scale-[0.80] origin-top">

              {/* VIEWPORT CONTAINER */}
              <div
                ref={componentRef}
                className="resume-preview-container"
                style={{
                  width: currentPageConfig.width,
                  height: currentPageConfig.height,
                  position: 'relative'
                }}
              >
                {/* Visual Border for screen only */}
                <div className="paper-shadow-border absolute inset-0 border-[1px] border-gray-200 pointer-events-none z-20"></div>

                {/* SLIDING CONTENT LAYER */}
                {/* Note: In Preview Mode, we simulate margins by applying padding to parent and translating inner content */}
                {/* In Print Mode, CSS overrides remove padding/margins and disable transform */}
                <div className="resume-viewport w-full h-full overflow-hidden">
                  <div
                    ref={contentLayerRef}
                    className="resume-content-layer transition-transform duration-300 ease-out"
                    style={{
                      width: '100%',
                      fontFamily: styles.fontFamily,
                      lineHeight: styles.lineHeight,
                      // Fix for last element cutoff: Ensure bottom padding
                      paddingBottom: '1px',
                      transform: `translateY(-${(currentPage - 1) * currentPrintableHeightPx}px)`
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
    </div>
  );
}
