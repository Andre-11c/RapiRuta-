// Menú desplegable usuario - compatible con múltiples páginas
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('profile-btn');
  const menu = document.getElementById('user-menu-dropdown');
  if (btn && menu) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      menu.classList.toggle('show');
    });
    document.addEventListener('click', function(e) {
      if (!menu.contains(e.target) && e.target !== btn) {
        menu.classList.remove('show');
      }
    });
    btn.addEventListener('blur', function() {
      setTimeout(function() {
        if (!menu.matches(':hover')) {
          menu.classList.remove('show');
        }
      }, 200);
    });
  }
});
function cambiarContenido(nuevaSrc, textoRutas, textoDer) {
  document.getElementById('imagen-central').src = nuevaSrc;

  const contenedorIzquierda = document.getElementById('texto-izquierda');
  contenedorIzquierda.innerHTML = '';

  const lineas = textoRutas.split('<br>').filter(linea => linea.trim() !== '');

  if (lineas.length > 0) {
    const titulo = document.createElement('h3');
    titulo.textContent = lineas[0].replace(/🚌/g, '').trim();
    titulo.className = 'titulo-paradas';
    contenedorIzquierda.appendChild(titulo);
  }

  for (let i = 1; i < lineas.length; i++) {
    const parada = lineas[i].trim();
    if (!parada) continue;

    const divRuta = document.createElement('div');
    divRuta.className = 'ruta-item';

    const nombreParada = document.createElement('div');
    nombreParada.className = 'nombre-parada';
    nombreParada.textContent = parada;

    const botonesContainer = document.createElement('div');
    botonesContainer.className = 'botones-parada';

    const btnFav = document.createElement('button');
    btnFav.className = 'btn-ruta';
    btnFav.textContent = '⭐ Favorito';

    const btnDet = document.createElement('button');
    btnDet.className = 'btn-ruta';
    btnDet.textContent = 'ℹ️ Detalles';
    btnDet.onclick = function () {
      window.location.href = 'detalles.html';
    };

    botonesContainer.appendChild(btnFav);
    botonesContainer.appendChild(btnDet);

    divRuta.appendChild(nombreParada);
    divRuta.appendChild(botonesContainer);

    contenedorIzquierda.appendChild(divRuta);
  }

  document.getElementById('texto-derecha').innerHTML = textoDer;
}

window.onload = function () {
  if (typeof cambiarContenido === 'function') {
    cambiarContenido(
      'assets/images/R2075095.png',
      'PARADAS DE BUS<br><br>🚌Ate - Callao<br>🚌Molina - San Miguel<br>🚌Ate - San Miguel',
      'DATOS DE CORREDOR<br><br>Corredor Rojo tiene rutas de autobús que operan en todo Lima incluyendo: Ate, San Isidro, Lince, San Borja, Jesus Maria, San Miguel, La Molina.'
    );
  }
};

// --- Funciones de herramientas.html ---
function abrirFormulario(nombre, hora, dia) {
  document.getElementById('nombre-horario').value = nombre;
  document.getElementById('hora-horario').value = hora;
  document.getElementById('dia-horario').value = dia;
  document.getElementById('formulario-edicion').classList.remove('oculto');
}

function cerrarFormulario() {
  document.getElementById('formulario-edicion').classList.add('oculto');
}

function guardarCambios(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre-horario').value;
  const hora = document.getElementById('hora-horario').value;
  const dia = document.getElementById('dia-horario').value;
  cerrarFormulario();
}

function eliminarHorario() {
  if (confirm('¿Seguro que deseas eliminar este horario?')) {
    alert('Horario eliminado');
    cerrarFormulario();
  }
}

// --- Menú de usuario ---
function toggleUserMenu() {
  const menu = document.getElementById('user-menu-dropdown');
  if (menu) {
    menu.classList.toggle('show');
  }
}


