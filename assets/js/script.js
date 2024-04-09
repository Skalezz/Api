
const resultado = document.querySelector("#resultado");
const calculador = document.querySelector("#calcular");
let myChart

async function convertirMoneda() {
  try {
    const montoPesos = +document.querySelector("#monto").value; 
    const monedaSelect = document.querySelector("#moneda").value;
    const mindicadorUrl = `https://mindicador.cl/api/${monedaSelect}`;
    const res = await fetch(mindicadorUrl); 
    const data = await res.json();

    const tasaCambio = data.serie[0].valor; 
    const cambioDone = montoPesos / tasaCambio;

    resultado.textContent = `${cambioDone.toFixed(2)}`;
    destroyChart(); 
    getChart();

  } catch (error) { 
    alert(error.message);
  }
}

calculador.addEventListener("click", convertirMoneda);

function destroyChart() { 
  
  if (myChart) {
    myChart.destroy();
  }
}

async function getChartdata() {
  const monedaSelect = document.querySelector("#moneda").value;
  const mindicadorUrl = `https://mindicador.cl/api/${monedaSelect}`;
  const res = await fetch(mindicadorUrl);
  const data = await res.json();

  const primerFecha = data.serie.slice(0, 10); 
  const labels = primerFecha.map((data) => {  
    return data.fecha;
  });
  const datos = primerFecha.map((data) => { 
    return Number(data.valor);
  });

  const datasets = [ 
    {
      label: `${monedaSelect}`,
      borderColor: "rgb(255, 99, 132)",
      data: datos,
    }
  ];
  return { labels, datasets };
}

async function getChart() { 
  const data = await getChartdata();
  const config = {
    type: "line",
    data,
    options: {
      scales: {
        x: {
          type: 'category',
          labels: data.labels,
          ticks: {
            autoSkip: false,
            color: 'white'
          },
        },
        y: {
          beginAtZero: false,
          ticks: {
            autoSkip: false,
            color: 'white'
          },
        }
      }
    }
  };

  myChart = new Chart(document.getElementById("myChart"), config); 
}