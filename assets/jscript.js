document.addEventListener('DOMContentLoaded', function() {
  var filtroRuta = document.getElementById('filtro-ruta');
  if (filtroRuta) {
    filtroRuta.addEventListener('change', function() {
      var val = filtroRuta.value;
      var items = document.querySelectorAll('.horario-item');
      // Mostrar todos por defecto
      items.forEach(function(item) { item.style.display = ''; });
      if (val === 'ruta1') {
        // Oculta el primer horario de cada día
        document.querySelectorAll('.horario-dia').forEach(function(diaDiv) {
          var first = diaDiv.querySelector('.horario-item');
          if (first) first.style.display = 'none';
        });
      } else if (val === 'ruta2') {
        // Oculta el último horario de cada día
        document.querySelectorAll('.horario-dia').forEach(function(diaDiv) {
          var items = diaDiv.querySelectorAll('.horario-item');
          if (items.length > 0) items[items.length-1].style.display = 'none';
        });
      } else if (val === 'ruta3') {
        // Oculta todos los horarios con hora menor a 10:00
        items.forEach(function(item) {
          var p = item.querySelector('p');
          if (p && /^([0-9]{2}):([0-9]{2})/.test(p.textContent)) {
            var hora = p.textContent.match(/^([0-9]{2}):([0-9]{2})/);
            if (hora && parseInt(hora[1]) < 10) item.style.display = 'none';
          }
        });
      }
    });
  }
  var formAgregar = document.querySelector('.horario-form');
  if (formAgregar) {
    formAgregar.addEventListener('submit', function(e) {
      e.preventDefault();
      var nombre = formAgregar.querySelector('input[type="text"]').value.trim();
      var hora = formAgregar.querySelector('input[type="time"]').value;
      var dia = formAgregar.querySelector('select').value;
      if (!nombre || !hora || !dia) return;
      var dias = document.querySelectorAll('.horario-dia');
      dias.forEach(function(diaDiv) {
        var h3 = diaDiv.querySelector('h3');
        if (h3 && h3.textContent.trim() === dia) {
          var item = document.createElement('div');
          item.className = 'horario-item';
          var p = document.createElement('p');
          p.textContent = hora + ' - ' + nombre;
          var actions = document.createElement('div');
          actions.className = 'horario-actions';
          var verRuta = document.createElement('a');
          verRuta.href = 'rutas.html';
          verRuta.className = 'horario-btn';
          verRuta.textContent = 'Ver Ruta';
          var editar = document.createElement('button');
          editar.className = 'horario-btn editar';
          editar.textContent = 'Editar';
          editar.onclick = function() {
            abrirFormulario(nombre, hora, dia, item, p);
          };
          actions.appendChild(verRuta);
          actions.appendChild(editar);
          item.appendChild(p);
          item.appendChild(actions);
          diaDiv.appendChild(item);
        }
      });
      formAgregar.reset();
    });
  }
  var noticias = document.querySelectorAll('.alarma-noticia.noticia-item');
  noticias.forEach(function(noticia) {
    noticia.addEventListener('focus', function() {
      noticia.style.boxShadow = '0 4px 16px rgba(60,77,129,0.13)';
      noticia.style.background = 'rgba(60,77,129,0.08)';
      noticia.style.zIndex = 1;
    });
    noticia.addEventListener('blur', function() {
      noticia.style.boxShadow = '';
      noticia.style.background = '';
      noticia.style.zIndex = '';
    });
  });
});
document.addEventListener('DOMContentLoaded', function() {
  var btnVerMas = document.getElementById('ver-mas-noticias');
  var noticiasExtra = document.getElementById('noticias-extra');
  if (btnVerMas && noticiasExtra) {
    btnVerMas.addEventListener('click', function() {
      noticiasExtra.style.display = 'block';
      btnVerMas.style.display = 'none';
    });
  }
});
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
    btnFav.onclick = function () {
      mostrarNotificacion('Ruta agregada a Favoritos');
    };

window.mostrarNotificacion = function(mensaje) {
  let notif = document.createElement('div');
  notif.textContent = mensaje;
  notif.style.position = 'fixed';
  notif.style.top = '32px';
  notif.style.left = '50%';
  notif.style.transform = 'translateX(-50%)';
  notif.style.background = 'linear-gradient(90deg,#e53935 80%,#b71c1c 100%)';
  notif.style.color = '#fff';
  notif.style.padding = '16px 38px';
  notif.style.borderRadius = '18px';
  notif.style.fontSize = '1.13em';
  notif.style.fontWeight = '700';
  notif.style.boxShadow = '0 4px 18px rgba(229,57,53,0.18)';
  notif.style.zIndex = '9999';
  notif.style.opacity = '0';
  notif.style.transition = 'opacity 0.3s';
  notif.style.letterSpacing = '0.5px';
  notif.style.display = 'flex';
  notif.style.alignItems = 'center';
  notif.style.gap = '8px';
  notif.className = 'notif-favorito';
  document.body.appendChild(notif);
  setTimeout(function(){ notif.style.opacity = '1'; }, 10);
  setTimeout(function(){ notif.style.opacity = '0'; }, 1800);
  setTimeout(function(){ notif.remove(); }, 2200);
}



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


// Datos de rutas
const rutas = [
  {
    nombre: "Corredor Rojo",
    imagen: "assets/images/R2075095.png",
    paradas: "PARADAS DE BUS<br><br>🚌Ate - Callao<br>🚌Molina - San Miguel<br>🚌Ate - San Miguel",
    datos: "DATOS DE CORREDOR<br><br>Corredor Rojo tiene rutas de autobús que operan en todo Lima incluyendo: Ate, San Isidro, Lince, San Borja, Jesus Maria, San Miguel, La Molina."
  },
  {
    nombre: "Metropolitano",
    imagen: "assets/images/R6593302.png",
    paradas: "PARADAS DE BUS<br><br>🚌Terminal Naranjal<br>🚌Estacion Chimpu<br>🚌Terminal Matellini<br>🚌Plaza de Flores",
    datos: "DATOS DE CORREDOR<br><br>Metropolitano tiene rutas de autobús que operan en todo Lima incluyendo: Miraflores, Lince, Independen, San Martin, Carabayllo, Breña, Chorrillos, Lima."
  },
  {
    nombre: "Corredor Morado",
    imagen: "assets/images/R858863.png",
    paradas: "PARADAS DE BUS<br><br>🚌S.J.L. - Magdalena<br>🚌S.J.L. - San Isidro<br>🚌S.J.L. - Centro de Lima",
    datos: "DATOS DE CORREDOR<br><br>Corredor Morado tiene rutas de autobús que operan en todo Lima incluyendo: San Juan D, Jesus Mari, Lima."
  },
  {
    nombre: "Corredor Azul",
    imagen: "assets/images/R861589.png",
    paradas: "PARADAS DE BUS<br><br>🚌Rimac - Barranco<br>🚌S.J.L. - Miraflores<br>🚌Rimac - Miraflores<br>🚌Alimentador Abancaes<br>🚌Alimentador Las Lomas",
    datos: "DATOS DE CORREDOR<br><br>Corredor Azul tiene rutas de autobús que operan en todo Lima incluyendo: Miraflores, San Juan D, Lima."
  },
  {
    nombre: "Metropolitano - Alimentadores",
    imagen: "assets/images/R882689.png",
    paradas: "PARADAS DE BUS<br><br>🚌Tahuantinsuyo<br>🚌Naranjal<br>🚌Trapiche<br>🚌Collique<br>🚌Payet<br>🚌Belaunde<br>🚌Carabayllo<br>🚌Puente Piedra",
    datos: "DATOS DE CORREDOR<br><br>Metropolitano - Alimentadores tiene rutas de autobús que operan en todo Lima incluyendo: Puente Pie, Carabayllo, San Martin, Comas, Los Olivos, Villa El S."
  },
  {
    nombre: "Grupo Diez S.A.C",
    imagen: "assets/images/R1110949.png",
    paradas: "PARADAS DE BUS<br><br>🚌S.M.P. - Santiago de Surco",
    datos: "DATOS DE CORREDOR<br><br>El autobús ruta comienza en Pacasmayo y termina en Upc Monterrico."
  },
  {
    nombre: "Transporte y Servicio La Esperanza S.A.",
    imagen: "assets/images/R10271.png",
    paradas: "PARADAS DE BUS<br><br>🚌Callao - La Punta<br>🚌La Q",
    datos: "DATOS DE CORREDOR<br><br>La línea más larga de Transportes y Servicios La Esperanza S.A. es la UCL03. El autobús ruta comienza en Zela y termina en Avenida Bertello. "
  },
  {
    nombre: "Consorcio S4",
    imagen: "assets/images/R858787.png",
    paradas: "PARADAS DE BUS<br><br>🚌Huaytapampa<br>🚌Loza/Alca<br>🚌Jr Alca<br>🚌Jose Gabriel<br>🚌San Francisco",
    datos: "DATOS DE CORREDOR<br><br>La primera parada de la línea CR53 de autobús es Huaytapampa y la última parada es Contisuyo. La línea CR53 (Independencia - San Miguel) está operativa los todos los días."
  },
  {
    nombre: "Virgen de la Asuncion S.A.",
    imagen: "assets/images/R858863.png",
    paradas: "PARADAS DE BUS<br><br>🚌Ate - S.M.P.",
    datos: "DATOS DE CORREDOR<br><br>Virgen de la Asunción S.A. tiene rutas de autobús que operan en todo Lima incluyendo: Ate, Santa Anit."
  }
];

function renderRutas(filtro = "") {
  const lista = document.getElementById("rutas-lista");
  lista.innerHTML = "";
  rutas.filter(r => r.nombre.toLowerCase().includes(filtro.toLowerCase()))
    .forEach((ruta, idx) => {
      const btn = document.createElement("button");
      btn.className = "ruta-btn";
      btn.innerHTML = `<span style='font-weight:bold;'>${ruta.nombre}</span>`;
      btn.onclick = () => cambiarContenido(ruta.imagen, ruta.paradas, ruta.datos);
      lista.appendChild(btn);
    });
}

document.addEventListener("DOMContentLoaded", function() {
  const buscador = document.getElementById("buscador-rutas");
  if (buscador) {
    buscador.addEventListener("input", function() {
      renderRutas(this.value);
    });
  }
  // Render inicial
  renderRutas();
});

// Estilizado de los botones de rutas
const style = document.createElement('style');
style.innerHTML = `
.ruta-btn {
  background: linear-gradient(90deg, #3C4D81 60%, #111D45 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px 0 rgba(44,44,44,0.10);
  transition: transform 0.18s cubic-bezier(0.4,0,0.2,1), box-shadow 0.18s cubic-bezier(0.4,0,0.2,1);
  min-width: 180px;
}
.ruta-btn:hover, .ruta-btn:focus {
  transform: scale(1.04);
  box-shadow: 0 4px 16px 0 rgba(44,44,44,0.18);
  outline: none;
}
#rutas-lista {
  width: 100%;
  justify-content: flex-start;
}
`;
document.head.appendChild(style);

let horarioEditando = null;
let horarioEditandoP = null;
function abrirFormulario(nombre, hora, dia, itemRef, pRef) {
  document.getElementById('nombre-horario').value = nombre;
  document.getElementById('hora-horario').value = hora;
  document.getElementById('dia-horario').value = dia;
  document.getElementById('formulario-edicion').classList.remove('oculto');
  horarioEditando = itemRef || null;
  horarioEditandoP = pRef || null;
  // Asignar función eliminar al botón del modal
  var btnEliminar = document.querySelector('#formulario-edicion .btn-eliminar');
  if (btnEliminar) {
    btnEliminar.onclick = function() {
      if (horarioEditando) horarioEditando.remove();
      cerrarFormulario();
      horarioEditando = null;
      horarioEditandoP = null;
    };
  }
}

function cerrarFormulario() {
  document.getElementById('formulario-edicion').classList.add('oculto');
}

function guardarCambios(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre-horario').value;
  const hora = document.getElementById('hora-horario').value;
  const dia = document.getElementById('dia-horario').value;
  if (horarioEditando && horarioEditandoP) {
    horarioEditandoP.textContent = hora + ' - ' + nombre;
    // Si se cambia de día, mover el item
    let parentDia = horarioEditando.closest('.horario-dia');
    let h3 = parentDia.querySelector('h3');
    if (h3 && h3.textContent.trim() !== dia) {
      // Mover a otro día
      let dias = document.querySelectorAll('.horario-dia');
      dias.forEach(function(diaDiv) {
        let h3d = diaDiv.querySelector('h3');
        if (h3d && h3d.textContent.trim() === dia) {
          diaDiv.appendChild(horarioEditando);
        }
      });
    }
  }
  cerrarFormulario();
  horarioEditando = null;
  horarioEditandoP = null;
}

// Eliminar desde modal, función ya asignada dinámicamente

function toggleUserMenu() {
  const menu = document.getElementById('user-menu-dropdown');
  if (menu) {
    menu.classList.toggle('show');
  }
}


