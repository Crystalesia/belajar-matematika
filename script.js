
// TABS LOGIC
document.querySelectorAll('.tab-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-tab'));
        btn.classList.add('active-tab');
        document.querySelectorAll('.tab-content').forEach((content, cIndex) => {
            if (index === cIndex) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    });
});

// OPERASI DASAR (Kelereng)
function hitungDasar() {
    const a = parseInt(document.getElementById('numA').value);
    const b = parseInt(document.getElementById('numB').value);
    const op = document.getElementById('operator1').value;
    const resultDiv = document.getElementById('result1');
    const visualDiv = document.getElementById('visual1');
    
    if (isNaN(a) || isNaN(b)) {
        resultDiv.innerText = "Masukkan angka yang valid ya!";
        visualDiv.innerHTML = "";
        return;
    }

    let res = 0;
    let visualHTML = '';

    const renderKelereng = (n, isCoret=false) => {
        let html = '';
        for(let i=0; i<n; i++) {
            html += `<div class="kelereng ${isCoret ? 'kelereng-coret' : ''}"></div>`;
        }
        return html;
    };

    if (op === '+') {
        res = a + b;
        resultDiv.innerText = `${a} + ${b} = ${res}`;
        visualHTML = `<div class="kelompok">${renderKelereng(a)}</div> <span class="text-3xl font-bold self-center">+</span> <div class="kelompok">${renderKelereng(b)}</div> <span class="text-3xl font-bold self-center">=</span> <div class="kelompok">${renderKelereng(res)}</div>`;
    } else if (op === '-') {
        res = a - b;
        if(res < 0) {
            resultDiv.innerText = "Hasilnya negatif, kelereng tidak cukup!";
            visualHTML = '';
        } else {
            resultDiv.innerText = `${a} - ${b} = ${res}`;
            visualHTML = `<div class="kelompok flex-col"><div class="font-bold text-sm text-gray-500 mb-2">Total ${a} Kelereng (Dicoret ${b})</div><div>${renderKelereng(res)}${renderKelereng(b, true)}</div></div>`;
        }
    } else if (op === 'x') {
        res = a * b;
        resultDiv.innerText = `${a} x ${b} = ${res} (${a} kelompok masing-masing ${b} kelereng)`;
        for(let i=0; i<a; i++){
            visualHTML += `<div class="kelompok flex-col text-sm">${renderKelereng(b)}</div>`;
        }
    } else if (op === ':') {
        if (b === 0) {
            resultDiv.innerText = "Tidak bisa dibagi nol!";
        } else {
            res = Math.floor(a / b);
            let sisa = a % b;
            resultDiv.innerText = `${a} : ${b} = ${res} sisa ${sisa} (Dibuat ${b} kelompok)`;
            for(let i=0; i<b; i++){
                visualHTML += `<div class="kelompok">${renderKelereng(res)}</div>`;
            }
            if(sisa > 0) {
                visualHTML += `<div class="p-2 border border-red-300 rounded bg-red-50 text-red-700 font-bold">Sisa: ${renderKelereng(sisa)}</div>`;
            }
        }
    } else if (op === '>' || op === '<' || op === '=') {
        let isTrue = false;
        if (op === '>') isTrue = a > b;
        if (op === '<') isTrue = a < b;
        if (op === '=') isTrue = a === b;
        resultDiv.innerText = `Pernyataan ${a} ${op} ${b} adalah ${isTrue ? 'BENAR!' : 'SALAH!'}`;
        visualHTML = `<div class="kelompok">${renderKelereng(a)}</div> <span class="text-3xl font-bold self-center ${isTrue ? 'text-green-500' : 'text-red-500'}">${op}</span> <div class="kelompok">${renderKelereng(b)}</div>`;
    }

    visualDiv.innerHTML = visualHTML;
}

// EKSPLORASI PECAHAN
let currentN = 0;
let currentD = 1;
function eksplorasiPecahan() {
    const n = parseInt(document.getElementById('numExplore').value);
    const d = parseInt(document.getElementById('denExplore').value);
    const resultDiv = document.getElementById('exploreResult');
    const visualDiv = document.getElementById('visual2');
    const optionsDiv = document.getElementById('exploreOptions');

    if(isNaN(n) || isNaN(d) || d === 0) {
        resultDiv.innerText = "Masukkan pecahan yang valid (Penyebut tidak boleh 0).";
        return;
    }
    currentN = n;
    currentD = d;
    
    resultDiv.innerText = `Visualisasi Pecahan ${n}/${d}`;
    visualDiv.innerHTML = renderFractionBar(n, d);
    optionsDiv.classList.remove('hidden');
}

function renderFractionBar(n, d) {
    let barCount = Math.ceil(n / d);
    if (barCount === 0) barCount = 1;

    let html = `<div class="flex flex-col gap-2">`;
    let remaining = n;
    
    for(let b=0; b<barCount; b++) {
        html += `<div class="fraction-bar" style="width: ${Math.min(300, d*30)}px;">`;
        for(let i=0; i<d; i++) {
            if(remaining > 0) {
                html += `<div class="fraction-fill" style="width: ${100/d}%"></div>`;
                remaining--;
            } else {
                html += `<div class="fraction-empty" style="width: ${100/d}%"></div>`;
            }
        }
        html += `</div>`;
    }
    html += `</div>`;
    return html;
}

function showDesimal() {
    let val = currentN / currentD;
    document.getElementById('exploreResult').innerText = `Bentuk Desimal dari ${currentN}/${currentD} adalah ${val.toFixed(3).replace(/\.?0+$/, '')}`;
}
function showPersen() {
    let val = (currentN / currentD) * 100;
    document.getElementById('exploreResult').innerText = `Bentuk Persen dari ${currentN}/${currentD} adalah ${val.toFixed(1).replace(/\.0$/, '')}%`;
}
function showSenilai() {
    let m = 2; // Kita kalikan 2 atas bawah
    document.getElementById('exploreResult').innerHTML = `Pecahan Senilai: <br> ${currentN}/${currentD} dikalikan 2 menjadi <b>${currentN * m}/${currentD * m}</b>`;
    document.getElementById('visual2').innerHTML = `<div class="flex flex-col items-center gap-2"><span class="font-bold text-gray-500">Asli (${currentN}/${currentD}):</span> ${renderFractionBar(currentN, currentD)} <span class="font-bold text-gray-500 mt-2">Senilai (${currentN*m}/${currentD*m}):</span> ${renderFractionBar(currentN*m, currentD*m)}</div>`;
}

// OPERASI & PERBANDINGAN PECAHAN
function hitungPecahan() {
    const n1 = parseInt(document.getElementById('numF1').value);
    const d1 = parseInt(document.getElementById('denF1').value);
    const n2 = parseInt(document.getElementById('numF2').value);
    const d2 = parseInt(document.getElementById('denF2').value);
    const op = document.getElementById('operatorF').value;
    const resDiv = document.getElementById('result3');
    const visDiv = document.getElementById('visual3');

    if(isNaN(n1)||isNaN(d1)||isNaN(n2)||isNaN(d2) || d1===0 || d2===0) {
        resDiv.innerText = "Masukkan semua nilai pecahan dengan benar (Penyebut tidak 0).";
        return;
    }

    let resN = 0, resD = 1;
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

    if (op === '+') {
        resN = (n1*d2) + (n2*d1);
        resD = d1 * d2;
    } else if (op === '-') {
        resN = (n1*d2) - (n2*d1);
        resD = d1 * d2;
    } else if (op === 'x') {
        resN = n1 * n2;
        resD = d1 * d2;
    } else if (op === ':') {
        resN = n1 * d2;
        resD = d1 * n2;
    }

    if (op === '>' || op === '<' || op === '=') {
        let v1 = n1/d1;
        let v2 = n2/d2;
        let isTrue = false;
        if(op==='>') isTrue = v1>v2;
        if(op==='<') isTrue = v1<v2;
        if(op==='=') isTrue = v1===v2;
        resDiv.innerText = `${n1}/${d1} ${op} ${n2}/${d2} adalah ${isTrue ? 'BENAR!' : 'SALAH!'}`;
        visDiv.innerHTML = `
            <div class="flex flex-col items-center"><div class="font-bold">${n1}/${d1}</div>${renderFractionBar(n1,d1)}</div>
            <div class="text-3xl font-bold ${isTrue ? 'text-green-500' : 'text-red-500'}">${op}</div>
            <div class="flex flex-col items-center"><div class="font-bold">${n2}/${d2}</div>${renderFractionBar(n2,d2)}</div>`;
        return;
    }

    let divisor = Math.abs(gcd(resN, resD));
    if(divisor === 0) divisor = 1;
    let simpN = resN / divisor;
    let simpD = resD / divisor;

    resDiv.innerHTML = `Hasilnya: ${resN}/${resD} <br> Disederhanakan menjadi: <span class="text-2xl text-orange-600">${simpN}/${simpD}</span>`;
    visDiv.innerHTML = `
        <div class="flex flex-col items-center"><div class="font-bold">${n1}/${d1}</div>${renderFractionBar(n1,d1)}</div>
        <div class="text-3xl font-bold text-orange-500">${op}</div>
        <div class="flex flex-col items-center"><div class="font-bold">${n2}/${d2}</div>${renderFractionBar(n2,d2)}</div>
        <div class="text-3xl font-bold text-orange-500">=</div>
        <div class="flex flex-col items-center"><div class="font-bold text-orange-600">${simpN}/${simpD}</div>${renderFractionBar(simpN, simpD)}</div>`;
}
