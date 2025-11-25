// كود مبسط وسهل يعمل على الجوال
class PageGenerator {
    constructor() {
        console.log('🚀 بدء تشغيل المولد...');
        this.parts = [];
        this.partsCount = 0;
        this.init();
    }
    
    init() {
        console.log('🔧 تهيئة المولد...');
        
        // تحميل البيانات الأولية
        this.loadInitialData();
        
        // عرض البارتات
        this.renderPartsList();
        
        // حساب الحجم الكلي
        this.calculateTotalSize();
        
        console.log('✅ المولد جاهز للاستخدام');
    }
    
    loadInitialData() {
        console.log('📥 تحميل البيانات الأولية...');
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
        console.log(`📊 تم تحميل ${this.parts.length} بارت`);
    }
    
    renderPartsList() {
        console.log('🎨 عرض قائمة البارتات...');
        const partsList = document.getElementById('partsList');
        
        if (!partsList) {
            console.error('❌ لم يتم العثور على عنصر partsList');
            return;
        }
        
        // مسح المحتوى الحالي
        partsList.innerHTML = '';
        
        // إذا لم توجد بارتات
        if (this.parts.length === 0) {
            partsList.innerHTML = '<div class="no-parts">لا توجد بارتات مضافة</div>';
            return;
        }
        
        // إضافة كل بارت
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
                    <input type="text" value="${part.name}" 
                           onchange="pageGenerator.updatePartName('${part.id}', this.value)"
                           placeholder="اسم البارت">
                </div>
                <div class="form-group">
                    <label>الحجم:</label>
                    <div class="size-input">
                        <input type="number" value="${part.size}" step="0.01" min="0" 
                               onchange="pageGenerator.updatePartSize('${part.id}', this.value)"
                               placeholder="0.00">
                        <select class="size-unit" onchange="pageGenerator.updatePartUnit('${part.id}', this.value)">
                            <option value="MB" ${part.unit === 'MB' ? 'selected' : ''}>MB</option>
                            <option value="GB" ${part.unit === 'GB' ? 'selected' : ''}>GB</option>
                        </select>
                    </div>
                </div>
                <div class="form-group" style="grid-column: 1 / -1;">
                    <label>رابط التحميل:</label>
                    <input type="url" value="${part.url}" 
                           onchange="pageGenerator.updatePartUrl('${part.id}', this.value)"
                           placeholder="https://example.com/file">
                </div>
            </div>
        `;
        return partDiv;
    }
    
    addPart() {
        console.log('➕ إضافة بارت جديد...');
        this.partsCount++;
        
        const newPart = {
            id: 'part_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            name: `البارت ${this.partsCount}`,
            size: '1.00',
            unit: 'GB',
            url: ''
        };
        
        this.parts.push(newPart);
        this.renderPartsList();
        this.calculateTotalSize();
        
        alert('✅ تم إضافة بارت جديد');
        console.log('✅ تم إضافة بارت جديد:', newPart);
    }
    
    removePart() {
        console.log('➖ حذف آخر بارت...');
        
        if (this.parts.length > 0) {
            const removedPart = this.parts.pop();
            this.partsCount--;
            this.renderPartsList();
            this.calculateTotalSize();
            alert('✅ تم حذف البارت: ' + removedPart.name);
        } else {
            alert('⚠️ لا توجد بارتات للحذف');
        }
    }
    
    removeSpecificPart(partId) {
        console.log('🗑️ حذف البارت:', partId);
        
        const partIndex = this.parts.findIndex(part => part.id === partId);
        if (partIndex !== -1) {
            const removedPart = this.parts[partIndex];
            this.parts.splice(partIndex, 1);
            this.partsCount = this.parts.length;
            this.renderPartsList();
            this.renumberParts();
            this.calculateTotalSize();
            alert('✅ تم حذف البارت: ' + removedPart.name);
        }
    }
    
    renumberParts() {
        console.log('🔢 إعادة ترقيم البارتات...');
        this.parts.forEach((part, index) => {
            part.name = `البارت ${index + 1}`;
        });
        this.partsCount = this.parts.length;
    }
    
    updatePartName(partId, newName) {
        const part = this.parts.find(p => p.id === partId);
        if (part) {
            part.name = newName;
            console.log('✏️ تحديث اسم البارت:', newName);
        }
    }
    
    updatePartSize(partId, newSize) {
        const part = this.parts.find(p => p.id === partId);
        if (part) {
            part.size = newSize;
            this.calculateTotalSize();
            console.log('📊 تحديث حجم البارت:', newSize);
        }
    }
    
    updatePartUnit(partId, newUnit) {
        const part = this.parts.find(p => p.id === partId);
        if (part) {
            part.unit = newUnit;
            this.calculateTotalSize();
            console.log('🔄 تحديث وحدة البارت:', newUnit);
        }
    }
    
    updatePartUrl(partId, newUrl) {
        const part = this.parts.find(p => p.id === partId);
        if (part) {
            part.url = newUrl;
            console.log('🔗 تحديث رابط البارت:', newUrl);
        }
    }
    
    calculateTotalSize() {
        console.log('🧮 حساب الحجم الكلي...');
        let totalSizeGB = 0;
        
        this.parts.forEach(part => {
            let size = parseFloat(part.size) || 0;
            if (part.unit === 'MB') {
                size = size / 1024; // تحويل MB إلى GB
            }
            totalSizeGB += size;
        });
        
        const totalSizeElement = document.getElementById('totalSizeValue');
        if (totalSizeElement) {
            totalSizeElement.textContent = totalSizeGB.toFixed(2);
            console.log('✅ الحجم الكلي:', totalSizeGB.toFixed(2), 'GB');
        }
    }
    
    generatePage() {
        console.log('⚡ توليد الصفحة...');
        
        const gameName = document.getElementById('gameName').value || 'اللعبة';
        const fileExtension = document.getElementById('fileExtension').value;
        const fileName = `${gameName}.${fileExtension}`;
        
        // توليد الكود
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
        
        // عرض الكود في المعاينة
        document.getElementById('codePreview').textContent = fullCode;
        
        alert('✅ تم توليد الصفحة بنجاح!');
        console.log('✅ تم توليد الصفحة بنجاح');
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
        // إرجاع CSS كامل للصفحة الناتجة
        return `/* أنماط CSS للصفحة الناتجة */`;
    }
    
    generateJSCode() {
        // إرجاع JavaScript كامل للصفحة الناتجة
        return `// كود JavaScript للصفحة الناتجة`;
    }
    
    exportConfig() {
        alert('📤 تصدير الإعدادات (سيتم تطويره لاحقاً)');
    }
    
    importConfig() {
        alert('📥 استيراد الإعدادات (سيتم تطويره لاحقاً)');
    }
}

// إنشاء نسخة عالمية من المولد
let pageGenerator;

// تهيئة المولد عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 تم تحميل الـ DOM بالكامل');
    try {
        pageGenerator = new PageGenerator();
        console.log('🎉 المولد جاهز للاستخدام!');
    } catch (error) {
        console.error('💥 خطأ في تهيئة المولد:', error);
        alert('حدث خطأ في تحميل المولد. يرجى تحديث الصفحة.');
    }
});

// الدوال العامة التي تستدعي من الـ HTML
function addPart() {
    if (pageGenerator) {
        pageGenerator.addPart();
    } else {
        alert('❌ المولد غير جاهز بعد. يرجى الانتظار...');
    }
}

function removePart() {
    if (pageGenerator) {
        pageGenerator.removePart();
    } else {
        alert('❌ المولد غير جاهز بعد. يرجى الانتظار...');
    }
}

function generatePage() {
    if (pageGenerator) {
        pageGenerator.generatePage();
    } else {
        alert('❌ المولد غير جاهز بعد. يرجى الانتظار...');
    }
}

function copyCode() {
    alert('📋 نسخ الكود (سيتم تطويره لاحقاً)');
}

function testPage() {
    alert('🧪 اختبار الصفحة (سيتم تطويره لاحقاً)');
}

function closeTestModal() {
    document.getElementById('testModal').style.display = 'none';
}

function exportConfig() {
    if (pageGenerator) {
        pageGenerator.exportConfig();
    }
}

function importConfig() {
    if (pageGenerator) {
        pageGenerator.importConfig();
    }
}

// بديل إذا فشل DOMContentLoaded
window.onload = function() {
    console.log('🔄 تم تحميل الصفحة بالكامل (window.onload)');
    if (!pageGenerator) {
        console.log('🔄 إعادة محاولة تهيئة المولد...');
        pageGenerator = new PageGenerator();
    }
};
