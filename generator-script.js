class PageGenerator {
    constructor() {
        this.parts = [];
        this.partsCount = 0;
        this.isMobile = this.checkMobile();
        this.init();
    }
    
    checkMobile() {
        return window.innerWidth <= 768;
    }
    
    init() {
        console.log('📱 الجهاز:', this.isMobile ? 'جوال' : 'كمبيوتر');
        this.loadInitialData();
        this.renderPartsList();
        this.calculateTotalSize();
    }
    
    loadInitialData() {
        this.parts = [
            {
                id: 'part1',
                name: 'البارت الأول',
                size: '9.77',
                unit: 'GB',
                url: 'https://akirabox.to/wgWGqqR0xG4o/file'
            },
            {
                id: 'part2', 
                name: 'البارت الثاني',
                size: '9.77',
                unit: 'GB',
                url: 'https://akirabox.to/0JgG70rO5moY/file'
            }
        ];
        this.partsCount = this.parts.length;
    }
    
    renderPartsList() {
        const partsList = document.getElementById('partsList');
        if (!partsList) {
            console.error('❌ partsList element not found!');
            setTimeout(() => this.renderPartsList(), 100);
            return;
        }
        
        partsList.innerHTML = '';
        
        if (this.parts.length === 0) {
            partsList.innerHTML = '<div class="no-parts">لا توجد بارتات مضافة</div>';
            return;
        }
        
        this.parts.forEach((part, index) => {
            const partElement = this.createPartElement(part, index);
            partsList.appendChild(partElement);
        });
        
        console.log(`✅ تم عرض ${this.parts.length} بارت`);
    }
    
    createPartElement(part, index) {
        const partDiv = document.createElement('div');
        partDiv.className = 'part-item';
        partDiv.innerHTML = `
            <div class="part-header">
                <span class="part-title">${part.name}</span>
                <button type="button" class="remove-part-btn" onclick="pageGenerator.removeSpecificPart('${part.id}')">
                    🗑️ حذف
                </button>
            </div>
            <div class="part-fields">
                <div class="form-group">
                    <label>اسم البارت:</label>
                    <input type="text" value="${part.name}" onchange="pageGenerator.updatePartName('${part.id}', this.value)">
                </div>
                <div class="form-group">
                    <label>الحجم:</label>
                    <div class="size-input">
                        <input type="number" value="${part.size}" step="0.01" min="0" 
                               onchange="pageGenerator.updatePartSize('${part.id}', this.value)">
                        <select class="size-unit" onchange="pageGenerator.updatePartUnit('${part.id}', this.value)">
                            <option value="MB" ${part.unit === 'MB' ? 'selected' : ''}>MB</option>
                            <option value="GB" ${part.unit === 'GB' ? 'selected' : ''}>GB</option>
                        </select>
                    </div>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                    <label>رابط التحميل:</label>
                    <input type="url" value="${part.url}" placeholder="https://example.com/file" 
                           onchange="pageGenerator.updatePartUrl('${part.id}', this.value)">
                </div>
            </div>
        `;
        return partDiv;
    }
    
    addPart() {
        this.partsCount++;
        const newPart = {
            id: 'part' + Date.now(),
            name: `البارت ${this.partsCount}`,
            size: '1.00',
            unit: 'GB',
            url: ''
        };
        this.parts.push(newPart);
        this.renderPartsList();
        this.calculateTotalSize();
        
        if (this.isMobile) {
            this.scrollToLastPart();
        }
    }
    
    scrollToLastPart() {
        setTimeout(() => {
            const lastPart = document.querySelector('.part-item:last-child');
            if (lastPart) {
                lastPart.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 100);
    }
    
    removePart() {
        if (this.parts.length > 0) {
            this.parts.pop();
            this.partsCount--;
            this.renderPartsList();
            this.calculateTotalSize();
        } else {
            this.showMobileAlert('⚠️ لا توجد بارتات للحذف');
        }
    }
    
    removeSpecificPart(partId) {
        this.parts = this.parts.filter(part => part.id !== partId);
        this.partsCount = this.parts.length;
        this.renderPartsList();
        this.renumberParts();
        this.calculateTotalSize();
    }
    
    renumberParts() {
        this.parts.forEach((part, index) => {
            part.name = `البارت ${index + 1}`;
        });
        this.partsCount = this.parts.length;
        this.renderPartsList();
    }
    
    updatePartName(partId, newName) {
        const part = this.parts.find(p => p.id === partId);
        if (part) part.name = newName;
    }
    
    updatePartSize(partId, newSize) {
        const part = this.parts.find(p => p.id === partId);
        if (part) {
            part.size = newSize;
            this.calculateTotalSize();
        }
    }
    
    updatePartUnit(partId, newUnit) {
        const part = this.parts.find(p => p.id === partId);
        if (part) {
            part.unit = newUnit;
            this.calculateTotalSize();
        }
    }
    
    updatePartUrl(partId, newUrl) {
        const part = this.parts.find(p => p.id === partId);
        if (part) part.url = newUrl;
    }
    
    calculateTotalSize() {
        let totalSizeGB = 0;
        
        this.parts.forEach(part => {
            let size = parseFloat(part.size) || 0;
            if (part.unit === 'MB') {
                size = size / 1024;
            }
            totalSizeGB += size;
        });
        
        const totalSizeElement = document.getElementById('totalSizeValue');
        if (totalSizeElement) {
            totalSizeElement.textContent = totalSizeGB.toFixed(2);
        }
    }
    
    showMobileAlert(message) {
        if (this.isMobile) {
            alert(message);
        } else {
            console.log(message);
        }
    }
    
    generatePage() {
        const gameName = document.getElementById('gameName').value || 'اللعبة';
        const fileExtension = document.getElementById('fileExtension').value;
        const fileName = `${gameName}.${fileExtension}`;
        
        const htmlCode = this.generateHTMLCode(fileName);
        const cssCode = this.generateCSSCode();
        const jsCode = this.generateJSCode();
        
        const fullCode = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${gameName} - 4GAMER</title>
    <style>
${cssCode}
    </style>
</head>
<body>
${htmlCode}
    <script>
${jsCode}
    </script>
</body>
</html>`;
        
        document.getElementById('codePreview').textContent = fullCode;
        
        if (this.isMobile) {
            this.showMobileAlert('✅ تم توليد الصفحة بنجاح!');
        }
    }
    
    generateHTMLCode(fileName) {
        let totalSizeGB = 0;
        this.parts.forEach(part => {
            let size = parseFloat(part.size) || 0;
            if (part.unit === 'MB') size = size / 1024;
            totalSizeGB += size;
        });
        
        return `    <div class="container">
        <header class="main-header">
            <h1>🗂️ مركز تحميل ${fileName}</h1>
            <div class="overall-progress">
                <div class="progress-text">
                    <span>التقدم: <span id="completed">0</span>/<span id="total">${this.parts.length}</span></span>
                    <span id="percentage">0%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
            </div>
        </header>

        <main>
            <div class="file-info-section">
                <div class="file-name-display">
                    <span>اسم الملف:</span> <span id="fullFileName">${fileName}</span>
                </div>
                <div class="total-size-display">
                    <span>الحجم الكلي:</span> <span id="totalFileSize">${totalSizeGB.toFixed(2)} GB</span>
                </div>
            </div>
            <div class="parts-grid" id="partsContainer">
${this.generatePartsHTML()}
            </div>
            <div class="actions">
                <button id="resetAllBtn" class="reset-btn">إعادة تعيين الكل</button>
            </div>
        </main>

        <footer class="footer">
            &copy; 2025 <a href="https://t.me/C9_9M" target="_blank">4GAMER</a>. جميع الحقوق محفوظة.
        </footer>
    </div>`;
    }
    
    generatePartsHTML() {
        return this.parts.map((part, index) => {
            return `                <div class="part-card" data-part-id="${part.id}">
                    <div class="part-header">
                        <div class="part-number">${(index + 1).toString().padStart(2, '0')}</div>
                        <div class="part-info">
                            <h3>${part.name}</h3>
                            <div class="part-size">${part.size} ${part.unit}</div>
                        </div>
                    </div>
                    
                    <div class="download-section">
                        <button class="download-btn" onclick="partsDownloader.downloadPart('${part.url}', '${part.id}')">
                            ⬇️
                        </button>
                        <div class="status-text">
                            جاهز للتحميل
                        </div>
                    </div>
                </div>`;
        }).join('\n');
    }
    
    generateCSSCode() {
        return `/* General Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, rgb(0, 18, 10) 0%, rgb(0, 8, 9) 100%);
    min-height: 100vh;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #f0f0f0;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 0 15px;
}

/* Header */
.main-header {
    text-align: center;
    margin-bottom: 30px;
    color: white;
    padding: 0 10px;
}

.main-header h1 {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    margin-bottom: 20px;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    word-wrap: break-word;
}

.overall-progress {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: clamp(15px, 3vw, 20px);
    max-width: 400px;
    margin: 0 auto;
}

.progress-text {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: clamp(0.9rem, 2.5vw, 1rem);
}

.progress-bar {
    height: 8px;
    background: rgba(255,255,255,0.2);
    border-radius: 4px;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, rgb(22, 185, 31), rgb(51, 224, 52));
    width: 0%;
    transition: width 0.5s ease;
    border-radius: 4px;
}

/* File Info Section */
.file-info-section {
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(5px);
    border-radius: 15px;
    padding: clamp(15px, 3vw, 20px);
    margin: 25px auto;
    max-width: 600px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.file-name-display,
.total-size-display {
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    font-weight: 500;
    color: #eee;
}

.file-name-display span:first-child,
.total-size-display span:first-child {
    color: #bbb;
    margin-left: 5px;
}

/* Parts Grid */
.parts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    padding: 20px 0;
    width: 100%;
}

@media (max-width: 768px) {
    .parts-grid {
        grid-template-columns: 1fr;
        gap: 12px;
    }
}

.part-card {
    background: rgba(255,255,255,0.05);
    border-radius: 15px;
    padding: clamp(15px, 3vw, 20px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255,255,255,0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    color: #f0f0f0;
}

.part-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
    transition: left 0.6s;
}

.part-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
}

.part-card:hover::before {
    left: 100%;
}

.part-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.part-number {
    width: clamp(35px, 8vw, 40px);
    height: clamp(35px, 8vw, 40px);
    border-radius: 50%;
    background: rgb(0, 107, 15);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: clamp(0.9rem, 2vw, 1rem);
    margin-left: 10px;
    flex-shrink: 0;
}

.part-info h3 {
    color: white;
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    margin-bottom: 3px;
}

.part-size {
    color: #bbb;
    font-size: clamp(0.75rem, 2vw, 0.8rem);
}

.download-section {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.download-btn {
    width: clamp(40px, 9vw, 45px);
    height: clamp(40px, 9vw, 45px);
    border: none;
    border-radius: 50%;
    background: rgb(22, 185, 31);
    color: white;
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    min-height: 44px;
}

.download-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 10px rgba(51, 224, 52, 0.4);
}

.download-btn:active {
    transform: scale(0.95);
}

.status-text {
    color: #bbb;
    font-weight: 500;
    transition: all 0.3s ease;
    font-size: clamp(0.8rem, 2vw, 0.9rem);
}

/* Downloaded State */
.part-card.downloaded {
    background: rgba(51, 224, 52, 0.1);
    border-color: rgba(51, 224, 52, 0.3);
}

.part-card.downloaded .download-btn {
    background: rgb(51, 224, 52);
}

.part-card.downloaded .status-text {
    color: rgb(51, 224, 52);
    font-weight: bold;
}

.part-card.downloaded .part-number {
    background: rgb(51, 224, 52);
}

/* Animation */
@keyframes successPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

.part-card.just-downloaded {
    animation: successPulse 0.6s ease;
}

/* Actions Section */
.actions {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
}

.reset-btn {
    background: linear-gradient(135deg, #ff6b6b, #ee5253);
    color: white;
    border: none;
    border-radius: 8px;
    padding: clamp(10px, 2.5vw, 12px) clamp(15px, 3vw, 20px);
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 3px 10px rgba(255, 107, 107, 0.3);
    min-height: 44px;
}

.reset-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
}

.reset-btn:active {
    transform: translateY(0);
    box-shadow: 0 1px 5px rgba(255, 107, 107, 0.2);
}

/* Footer */
.footer {
    margin-top: 30px;
    text-align: center;
    font-size: clamp(0.75rem, 2vw, 0.85rem);
    color: #aaa;
    padding: 0 10px;
}

.footer a {
    color: #eee;
    text-decoration: none;
    font-weight: bold;
}

.footer a:hover {
    text-decoration: underline;
}

/* Touch device improvements */
@media (hover: none) and (pointer: coarse) {
    .download-btn:hover {
        transform: none;
    }
    
    .part-card:hover {
        transform: none;
    }
    
    button:active {
        transform: scale(0.98);
    }
}

@media (max-width: 480px) {
    body {
        padding: 10px;
    }

    .main-header h1 {
        font-size: 1.8rem;
    }

    .overall-progress {
        padding: 15px;
    }

    .part-card {
        padding: 12px;
    }

    .part-header {
        margin-bottom: 12px;
    }

    .file-info-section {
        padding: 12px;
    }
}`;
    }
    
    generateJSCode() {
        const partsDataJSON = JSON.stringify(this.parts.map(part => ({
            id: part.id,
            name: part.name,
            size: part.size + ' ' + part.unit,
            url: part.url
        })), null, 2);
        
        return `// بيانات البارتات
const partsData = ${partsDataJSON};

class PartsDownloader {
    constructor() {
        this.partsContainer = document.getElementById('partsContainer');
        this.completedSpan = document.getElementById('completed');
        this.totalSpan = document.getElementById('total');
        this.percentageSpan = document.getElementById('percentage');
        this.progressFill = document.getElementById('progressFill');
        this.fullFileNameDisplay = document.getElementById('fullFileName');
        this.totalFileSizeDisplay = document.getElementById('totalFileSize');
        this.resetButton = null;
        
        this.init();
    }
    
    init() {
        this.resetButton = document.getElementById('resetAllBtn');
        this.renderParts();
        this.updateProgress();
        this.displayFileInfo();
        this.setupEventListeners();
    }
    
    renderParts() {
        this.partsContainer.innerHTML = '';
        
        partsData.forEach((part, index) => {
            const partCard = this.createPartCard(part, index + 1);
            this.partsContainer.appendChild(partCard);
        });
        
        this.totalSpan.textContent = partsData.length;
    }
    
    createPartCard(part, number) {
        const card = document.createElement('div');
        card.className = 'part-card';
        card.dataset.partId = part.id;
        
        const isDownloaded = localStorage.getItem(part.id) === 'downloaded';
        if (isDownloaded) {
            card.classList.add('downloaded');
        }
        
        card.innerHTML = \\`
            <div class="part-header">
                <div class="part-number">\\${number.toString().padStart(2, '0')}</div>
                <div class="part-info">
                    <h3>\\${part.name}</h3>
                    <div class="part-size">\\${part.size}</div>
                </div>
            </div>
            
            <div class="download-section">
                <button class="download-btn" onclick="partsDownloader.downloadPart('\\${part.url}', '\\${part.id}')">
                    \\${isDownloaded ? '✅' : '⬇️'}
                </button>
                <div class="status-text">
                    \\${isDownloaded ? 'تم التحميل' : 'جاهز للتحميل'}
                </div>
            </div>
        \\`;
        
        return card;
    }
    
    downloadPart(url, partId) {
        const card = document.querySelector(\\`[data-part-id="\\${partId}"]\\`);
        const btn = card.querySelector('.download-btn');
        const statusText = card.querySelector('.status-text');
        
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
        
        card.classList.add('downloaded', 'just-downloaded');
        btn.innerHTML = '✅';
        statusText.textContent = 'تم التحميل';
        
        localStorage.setItem(partId, 'downloaded');
        
        this.updateProgress();
        
        window.open(url, '_blank');
        
        setTimeout(() => {
            card.classList.remove('just-downloaded');
        }, 600);
    }
    
    updateProgress() {
        const completed = partsData.filter(part => 
            localStorage.getItem(part.id) === 'downloaded'
        ).length;
        
        const total = partsData.length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        this.completedSpan.textContent = completed;
        this.percentageSpan.textContent = \\`\\${percentage}%\\`;
        this.progressFill.style.width = \\`\\${percentage}%\\`;
    }

    displayFileInfo() {
        let totalSizeGB = 0;
        partsData.forEach(part => {
            const sizeValue = parseFloat(part.size.replace(' GB', '').replace(' MB', ''));
            if (!isNaN(sizeValue)) {
                if (part.size.includes('MB')) {
                    totalSizeGB += sizeValue / 1024;
                } else {
                    totalSizeGB += sizeValue;
                }
            }
        });

        this.totalFileSizeDisplay.textContent = \\`\\${totalSizeGB.toFixed(2)} GB\\`;
    }

    setupEventListeners() {
        if (this.resetButton) {
            this.resetButton.addEventListener('click', () => this.resetAllParts());
        }
    }

    resetAllParts() {
        if (confirm('هل أنت متأكد أنك تريد إعادة تعيين حالة جميع البارتات؟')) {
            partsData.forEach(part => {
                localStorage.removeItem(part.id);
            });
            this.renderParts();
            this.updateProgress();
            alert('تمت إعادة تعيين جميع البارتات بنجاح!');
        }
    }
}

// تشغيل التطبيق
let partsDownloader;
window.addEventListener('DOMContentLoaded', () => {
    partsDownloader = new PartsDownloader();
});`;
    }
    
    exportConfig() {
        const config = {
            gameName: document.getElementById('gameName').value,
            fileExtension: document.getElementById('fileExtension').value,
            parts: this.parts
        };
        
        const configStr = JSON.stringify(config, null, 2);
        const blob = new Blob([configStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = '4gamer-page-config.json';
        a.click();
        URL.revokeObjectURL(url);
        
        this.showMobileAlert('✅ تم تصدير الإعدادات');
    }
    
    importConfig() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = event => {
                try {
                    const config = JSON.parse(event.target.result);
                    this.loadConfig(config);
                } catch (error) {
                    alert('❌ خطأ في تحميل الملف!');
                }
            };
            reader.readAsText(file);
        };
        input.click();
    }
    
    loadConfig(config) {
        document.getElementById('gameName').value = config.gameName || '';
        document.getElementById('fileExtension').value = config.fileExtension || 'pkg';
        
        this.parts = config.parts || [];
        this.partsCount = this.parts.length;
        
        this.renderPartsList();
        this.calculateTotalSize();
        
        this.showMobileAlert('✅ تم تحميل الإعدادات بنجاح!');
    }
}

// الدوال العامة
function addPart() {
    pageGenerator.addPart();
}

function removePart() {
    pageGenerator.removePart();
}

function generatePage() {
    pageGenerator.generatePage();
}

function copyCode() {
    const code = document.getElementById('codePreview').textContent;
    if (!code || code.includes('الصفحة الناتجة')) {
        alert('❌ يرجى توليد الصفحة أولاً!');
        return;
    }
    navigator.clipboard.writeText(code).then(() => {
        alert('✅ تم نسخ الكود بنجاح!');
    });
}

function testPage() {
    const code = document.getElementById('codePreview').textContent;
    if (!code || code.includes('الصفحة الناتجة')) {
        alert('❌ يرجى توليد الصفحة أولاً!');
        return;
    }
    
    const iframe = document.getElementById('testIframe');
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    iframe.src = url;
    
    document.getElementById('testModal').style.display = 'block';
}

function closeTestModal() {
    document.getElementById('testModal').style.display = 'none';
    const iframe = document.getElementById('testIframe');
    iframe.src = 'about:blank';
}

function exportConfig() {
    pageGenerator.exportConfig();
}

function importConfig() {
    pageGenerator.importConfig();
}

// تهيئة التطبيق
let pageGenerator;
window.onload = function() {
    console.log('🚀 تم تحميل الصفحة - بدء تهيئة المولد');
    try {
        pageGenerator = new PageGenerator();
        console.log('✅ المولد جاهز للاستخدام');
    } catch (error) {
        console.error('❌ خطأ في تهيئة المولد:', error);
        alert('حدث خطأ في تحميل المولد، يرجى تحديث الصفحة');
    }
};
