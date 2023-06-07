let ingresoDinero = document.querySelector("#botonPresupuesto");
let ingresogastos = document.querySelector("#botonGastos");
let sumaPresupuesto = 0;
let sumaGastos = 0;
let stringInputValorGastos = "";
let stringSumaGastos = "";
let arrGastos = [];

ingresoDinero.addEventListener("click", (noReload) => {
  noReload.preventDefault();
  let stringSumaPresupuesto = "";
  let valorIngresoDinero = parseInt(
    document.querySelector("#valorPresupuesto").value
  );
  let inputPresupuesto = document.querySelector("#valorPresupuesto");
  if (isNaN(valorIngresoDinero) || valorIngresoDinero <= 0) {
  } else {
    sumaPresupuesto += valorIngresoDinero;
    stringSumaPresupuesto = sumaPresupuesto;
    stringSumaPresupuesto = period(stringSumaPresupuesto);
    rtPresupuesto.innerHTML = `                                                                     
            <div class="">Presupuesto</div>
            <div class="fs-4">$${stringSumaPresupuesto}</div>
        `;
    totalSaldo();
  }
  limpiarInput(inputPresupuesto);
});

ingresogastos.addEventListener("click", (noReload) => {
  noReload.preventDefault();
  let regex = /^\s*$/;
  let inputTextoGastos = document.querySelector("#textoGasto").value;
  let inputValorGastos = parseInt(document.querySelector("#valorGasto").value);
  let textoGastos = document.querySelector("#textoGasto");
  let valorGastos = document.querySelector("#valorGasto");
  if (regex.test(inputTextoGastos)) {
  } else if (isNaN(inputValorGastos) || inputValorGastos <= 0) {
  } else {
    let gasto = new fcGastos(inputTextoGastos, inputValorGastos);
    arrGastos.push(gasto);
    sumaGastos += inputValorGastos;
    stringSumaGastos = sumaGastos;
    stringSumaGastos = period(stringSumaGastos);
    rtGastos.innerHTML = `
            <div class="">Gastos</div>
            <div class="fs-4">$${stringSumaGastos}</div>
        `;
    tData.innerHTML = "";
    let indice = 0;
    arrGastos.forEach(function (gasto) {
      stringInputValorGastos = gasto.valor;
      stringInputValorGastos = period(stringInputValorGastos);
      tData.innerHTML += `
                <tr>
                    <td>${gasto.concepto}</td>
                    <td>$${stringInputValorGastos}</td>
                    <td><span class="bi bi-trash-fill text-danger" onclick="eliminar(${indice})"></span></td>
                </tr>
            `;
      indice++;
    });
    totalSaldo();
  }
  limpiarInput(textoGastos);
  limpiarInput(valorGastos);
});

function fcGastos(concepto, valor) {
  this.concepto = concepto;
  this.valor = valor;
}

function totalSaldo() {
  let valorTotalSaldo = 0;
  let stringValorTotalSaldo = "";
  valorTotalSaldo = sumaPresupuesto - sumaGastos;
  if (valorTotalSaldo <= 0) {
    valorTotalSaldo = 0;
  }
  stringValorTotalSaldo = valorTotalSaldo;
  stringValorTotalSaldo = period(stringValorTotalSaldo);
  rtSaldo.innerHTML = `                                                                           
        <div class="">Saldo</div>
        <div class="fs-4">$${stringValorTotalSaldo}</div>
    `;
}

function limpiarInput(elemento) {
  elemento.value = "";
}

function period(number) {
  number = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return number;
}

function eliminar(indice) {
  eliminarElemento = arrGastos[indice];
  valorElemento = arrGastos[indice].valor;
  sumaGastos -= valorElemento;
  stringSumaGastos = sumaGastos;
  stringSumaGastos = period(stringSumaGastos);
  rtGastos.innerHTML = `
        <div class="">Gastos</div>
        <div class="fs-4">$${stringSumaGastos}</div>
    `;
  let nuevoArray = arrGastos.filter((objeto) => objeto !== eliminarElemento);
  arrGastos = nuevoArray;
  tData.innerHTML = "";
  let indiceElemento = 0;
  arrGastos.forEach(function (gasto) {
    stringInputValorGastos = gasto.valor;
    stringInputValorGastos = period(stringInputValorGastos);
    tData.innerHTML += `
            <tr>
                <td>${gasto.concepto}</td>
                <td>$${stringInputValorGastos}</td>
                <td><span class="bi bi-trash-fill text-danger" onclick="eliminar(${indiceElemento})"></span></td>
            </tr>
        `;
    indiceElemento++;
  });
  totalSaldo();
}
