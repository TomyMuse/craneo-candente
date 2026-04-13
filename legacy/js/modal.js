function showModal(title, message, type = 'info') {
    // Remove existing modal if any
    const existing = document.getElementById('custom-modal');
    if (existing) existing.remove();

    const colors = {
        info: 'border-zinc-500 text-white',
        success: 'border-green-500 text-green-400',
        error: 'border-red-600 text-red-500'
    };

    const modalHtml = `
    <div id="custom-modal" class="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
        <div class="bg-[#111] border-2 ${colors[type] || colors.info} p-8 max-w-md w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] transform scale-100 animate-[scaleIn_0.2s_ease-out] relative">
            <h2 class="text-3xl font-black uppercase mb-4 ${type === 'error' ? 'text-red-500' : 'text-white'}">${title}</h2>
            <div class="text-zinc-300 text-lg mb-8 font-mono leading-relaxed">${message.replace(/\n/g, '<br>')}</div>
            <button onclick="closeModal()" class="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 uppercase tracking-widest border border-zinc-600 transition-all">
                ENTENDIDO
            </button>
            
            <div class="absolute -top-2 -left-2 w-4 h-4 bg-white/20"></div>
            <div class="absolute -bottom-2 -right-2 w-4 h-4 bg-white/20"></div>
        </div>
    </div>
    <style>
        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    </style>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeModal() {
    const modal = document.getElementById('custom-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 200);
    }
}
