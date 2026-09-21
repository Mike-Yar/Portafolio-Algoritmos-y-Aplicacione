// Referencias al Modal de Login
const modal = document.getElementById("loginModal");

function openLoginModal() {
    modal.style.display = "flex";
}

function closeLoginModal() {
    modal.style.display = "none";
    document.getElementById('login-error').textContent = "";
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    if (event.target == modal) {
        closeLoginModal();
    }
};

// Autenticación Administrador
function login() {
    const user = document.getElementById('adminUser').value.trim().toLowerCase();
    const pass = document.getElementById('adminPass').value;
    const error = document.getElementById('login-error');

    if (user === 'miguel' && pass === '123456') {
        document.body.classList.add('is-admin');
        
        const roleSpan = document.getElementById('current-role');
        roleSpan.textContent = 'Administrador (Miguel)';
        roleSpan.className = 'badge-admin';

        const authBtn = document.getElementById('auth-btn');
        authBtn.textContent = 'Cerrar Sesión';
        authBtn.classList.add('btn-logout');
        authBtn.onclick = logout;

        closeLoginModal();
        showToast('Modo administrador activado', 'success');
    } else {
        error.textContent = 'Usuario o contraseña incorrectos.';
    }
}

function logout() {
    document.body.classList.remove('is-admin');
    
    const roleSpan = document.getElementById('current-role');
    roleSpan.textContent = 'Visitante (Solo Lectura)';
    roleSpan.className = 'badge-guest';

    const authBtn = document.getElementById('auth-btn');
    authBtn.textContent = 'Acceso Admin';
    authBtn.classList.remove('btn-logout');
    authBtn.onclick = openLoginModal;

    document.getElementById('adminUser').value = "";
    document.getElementById('adminPass').value = "";

    showToast('Sesión de administrador cerrada');
}

// Navegación entre cursos
function switchCourse(courseId, btn) {
    document.querySelectorAll('.course-section').forEach(sec => sec.classList.remove('active-section'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(courseId).classList.add('active-section');
    btn.classList.add('active');
}

// Gestión de archivos subidos por el administrador
function saveAndPrepareDownload(inputId, downloadBtnId) {
    const fileInput = document.getElementById(inputId);
    const downloadBtn = document.getElementById(downloadBtnId);

    if (fileInput.files.length === 0) {
        showToast('Por favor, selecciona un archivo primero.', 'error');
        return;
    }

    const file = fileInput.files[0];
    const fileUrl = URL.createObjectURL(file);

    downloadBtn.href = fileUrl;
    downloadBtn.download = file.name;
    downloadBtn.classList.remove('disabled');
    downloadBtn.textContent = '📥 Descargar: ' + file.name;

    showToast(`Archivo "${file.name}" cargado exitosamente`, 'success');
}

// Notificaciones flotantes (Toast)
function showToast(message, type = '') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show ' + type;

    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}
            e.printStackTrace();
        }
    }
}
