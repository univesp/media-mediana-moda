$(document).ready(function() {

  //////////////////////////////////////////////////////////////////
  // HEADER DINÂMICO
  // Mostra header somente no início da página.
  // Descomentar caso utilizada a classe .header-dinamico. Caso contrário, deletar.

  $(window).scroll(function() {
    var nav = $(".header-dinamico .container");
    var scroll = $(window).scrollTop();
    if (scroll == 0) {
      nav.fadeIn();
    } else {
      nav.fadeOut();
    }
  });

  //////////////////////////////////////////////////////////////////

  // Seu código abaixo
  let caixa1 = new Caixa();
  let caixa2 = new Caixa();
  let btnMenuInicial = document.querySelectorAll('#secao2>div');
  let btnOK = document.querySelectorAll('.btnOK');
  let p4 = document.getElementById('P4');
  let input = document.querySelectorAll('.inputNum');
  let btnFinal = document.querySelectorAll('.conteudoBotoes > div:nth-of-type(1) > div');
  let menuLateral = document.querySelectorAll('.menuLateral > div')

  p4.addEventListener('keyup', fnP4);
  for (var i = 0; i < menuLateral.length; i++) {
    menuLateral[i].addEventListener('click', fnMenuLat);
  }
  for (var i = 0; i < btnFinal.length; i++) {
    btnFinal[i].addEventListener('click', btnQuadroFinal)
  }
  for (var i = 0; i < btnMenuInicial.length; i++) {
    btnMenuInicial[i].addEventListener('click', fnMenuInicial);
  }
  for (var i = 0; i < btnOK.length; i++) {
    btnOK[i].addEventListener('click', fnBtnOK)
  }
  for (var i = 0; i < input.length; i++) {
    if(i == 1){
      input[i].addEventListener('keyup', validaInput2);
      input[i].addEventListener('keypress', validaInput2);
    }
    else{
      input[i].addEventListener('keyup', validaInput);
      input[i].addEventListener('keypress', validaInput);
    }
  }

  function fnMenuInicial() {
    for (var i = 0; i < btnMenuInicial.length; i++) {
      btnMenuInicial[i].classList.remove('selecionado');
    }
    this.classList.add('selecionado');
    $('html, body').animate({
      scrollTop: $('#' + this.dataset.scroll).offset().top
    }, 500);
  }

  function revelaBolinhas() {
    media = document.getElementById('media')
    mediana = document.getElementById('mediana')
    media.style.display = 'flex';
    mediana.style.display = 'flex';
  }

  function escondeBolinhas() {
    media = document.getElementById('media')
    mediana = document.getElementById('mediana')
    media.style.display = 'none';
    mediana.style.display = 'none';
  }

  function fnBtnOK() {
    let valor = this.parentElement.querySelectorAll('input')[0].value;
    let nCaixa = this.dataset.caixa;
    let caixa = document.querySelectorAll('.caixaElementos[data-caixa="' + nCaixa + '"]')[0];
    let peso = '';
    console.log(validaValor(valor), valor);
    if (validaValor(valor)) {
      if (nCaixa == '1') {
        if(!isNaN(valor)){
          let elemento = criaElemento(valor);
          peso = elemento.dataset.peso;
          caixa.appendChild(elemento);
          caixa1.atualiza(peso, parseFloat(valor), 1);
          atualizaReta();
          if (caixa1.numElementos() > 0 && caixa1.min() != caixa1.max()) {
            revelaBolinhas();
          } else {
            escondeBolinhas();
          }
          this.parentElement.querySelectorAll('input')[0].value = "";
          this.parentElement.querySelectorAll('input')[0].focus();
        }
      }
      if (nCaixa == '2') {
        if (caixa2.numElementos() < numElemPos()) {
          let elemento = criaElemento(valor);
          peso = elemento.dataset.peso;
          caixa.appendChild(elemento);
          caixa2.atualiza(peso, parseFloat(valor), 1);
          let elmVlr = criaValor(valor, peso);
          let elmPeso = criaPeso(peso);
          document.querySelectorAll('.caixaDePesos > div:nth-of-type(1)')[0].appendChild(elmVlr);
          document.querySelectorAll('.caixaDePesos > div:nth-of-type(2)')[0].appendChild(elmPeso);
          atualizaCaixaResultados2();
          this.parentElement.querySelectorAll('input')[0].value = "";
          this.parentElement.querySelectorAll('input')[0].focus();
        }
      }
    }
  }

  function alimentaTabelaMedia(x) {
    let media = document.querySelectorAll('#mediaTab')[0];
    media.innerHTML = x;
  }

  function alimentaTabelaMediana(x) {
    let mediana = document.querySelectorAll('#medianaTab')[0];
    mediana.innerHTML = x.toFixed(2);
  }

  function atualizaReta() {
    // Moda.
    // console.log('moda: ', caixa1.moda());
    alimentaBolinhaModa(caixa1.moda());
    // Mediana.
    alimentaBolinhaMediana(caixa1.mediana());
    alimentaTabelaMediana(caixa1.mediana());
    posicionaBolinhaMediana();
    //Média.
    alimentaBolinhaMedia(caixa1.mediaArit());
    posicionaBolinhaMedia();
    alimentaTabelaMedia(caixa1.mediaArit());
    if (caixa1.min() == caixa1.max()) {
      atualizaMaximo("");
      atualizaMinimo("");
    } else {
      atualizaMaximo(caixa1.min());
      atualizaMinimo(caixa1.max());
    }
    alimentaTracinhos();
  }

  function verificaMaximoDireita(x) {
    let y = x;
    if (tamanhoDaTela() >= 1200) {
      if (x > 95.8) {
        y = 95.8
      } else if (x < 2.1) {
        y = -0.7
      }
    } else if (tamanhoDaTela() >= 992 && tamanhoDaTela() < 1200) {
      if (x > 95.6) {
        y = 95.6
      } else if (x < 2.1) {
        y = -0.7
      }
    } else if (tamanhoDaTela() >= 768 && tamanhoDaTela() < 992) {
      if (x > 94.6) {
        y = 94.6
      } else if (x < 2.1) {
        y = -1.5
      }
    } else if (tamanhoDaTela() >= 576 && tamanhoDaTela() < 768) {
      if (x > 93.4) {
        y = 93.4
      } else if (x < 2.1) {
        y = -2.5
      }
    } else if (tamanhoDaTela() >= 420 && tamanhoDaTela() < 576) {
      if (x > 92.2) {
        y = 93.2
      } else if (x < 2.1) {
        y = -4.5
      }
    } else if (tamanhoDaTela() >= 320 && tamanhoDaTela() < 420) {
      if (x > 90.9) {
        y = 90.9
      } else if (x < 2.1) {
        y = -5.5
      }
    } else {
      y = x
    }
    return (y);
  }

  function tamanhoDaTela() {
    return (screen.width);
  }

  function posicionaBolinhaMediana() {
    let mediana = document.getElementById('mediana');
    let minPX = px().minPX;
    let maxPX = px().maxPX;
    let pos = minPX + (maxPX - minPX) * ((caixa1.mediana() - caixa1.min()) / (caixa1.max() - caixa1.min()));
    mediana.style.left = pos + 'px';
  }

  function numElemPos(){
    let num = 0;
    if (tamanhoDaTela() >= 1200) {
      num = 9;
    }
    if (tamanhoDaTela() < 1200 && tamanhoDaTela() >= 992) {
      num = 9;
    }
    if (tamanhoDaTela() < 992 && tamanhoDaTela() >= 768) {
      num = 7;
    }
    if (tamanhoDaTela() < 768 && tamanhoDaTela() >= 576) {
      num = 4;
    }
    if (tamanhoDaTela() < 576 && tamanhoDaTela() >= 420) {
      num = 4
    }
    if (tamanhoDaTela() < 420 && tamanhoDaTela() >= 320) {
      num = 3;
    }
    return(num);
  }

  function px() {
    let min = 0;
    let max = 0;
    if (tamanhoDaTela() >= 1200) {
      min = -36;
      max = 982;
    }
    if (tamanhoDaTela() < 1200 && tamanhoDaTela() >= 992) {
      min = -40;
      max = 800;
    }
    if (tamanhoDaTela() < 992 && tamanhoDaTela() >= 768) {
      min = -46;
      max = 560;
    }
    if (tamanhoDaTela() < 768 && tamanhoDaTela() >= 576) {
      min = -50;
      max = 380;
    }
    if (tamanhoDaTela() < 576 && tamanhoDaTela() >= 420) {
      min = -50;
      max = 260;
    }
    if (tamanhoDaTela() < 420 && tamanhoDaTela() >= 320) {
      min = -50;
      max = 150;
    }
    return ({
      minPX: min,
      maxPX: max
    })
  }

  function posicionaBolinhaMedia() {
    let media = document.getElementById('media');
    let minPX = px().minPX;
    let maxPX = px().maxPX;
    let pos = minPX + (maxPX - minPX) * ((caixa1.mediaArit() - caixa1.min()) / (caixa1.max() - caixa1.min()));
    media.style.left = pos + 'px';
  }

  function alimentaTracinhos() {
    let retinhasDoMeio = document.querySelectorAll('.retinhas > span')
    let max = caixa1.max();
    let min = caixa1.min();
    if (min != max) {
      let incremento = (max - min) / 8;
      for (var i = 1; i < retinhasDoMeio.length - 1; i++) {
        retinhasDoMeio[i].innerHTML = (min + i * (incremento)).toFixed(2);
      }
    } else {
      for (var i = 1; i < retinhasDoMeio.length - 1; i++) {
        retinhasDoMeio[i].innerHTML = "";
      }
    }
  }

  function atualizaMaximo(x) {
    let retinha = document.querySelectorAll('.retinhas:nth-of-type(1) > span')[0];
    retinha.innerHTML = x
  }

  function atualizaMinimo(x) {
    let retinha = document.querySelectorAll('.retinhas:nth-of-type(9) > span')[0];
    retinha.innerHTML = x
  }

  function criaValor(x, y) {
    let div = document.createElement('div');
    div.classList.add('valpes');
    div.innerHTML = x;
    div.dataset.peso = y;
    return (div);
  }

  function criaPeso(x) {
    let div = document.createElement('div');
    let span = document.createElement('span');
    let div1 = document.createElement('div');
    let i1 = document.createElement('i');
    let i2 = document.createElement('i');
    i1.dataset.peso = x;
    i2.dataset.peso = x;
    i1.addEventListener('click', aumentaPeso);
    i2.addEventListener('click', diminuiPeso)

    div.classList.add('pes');
    i1.classList.add('fas', 'fa-plus');
    i2.classList.add('fas', 'fa-minus');
    span.innerHTML = '1';

    div1.appendChild(i1);
    div1.appendChild(i2);

    div.appendChild(span);
    div.appendChild(div1);
    div.dataset.peso = x;

    return (div);
  }

  function aumentaPeso() {
    if (caixa2.valores[this.dataset.peso].peso < 99) {
      caixa2.aumentaPeso(this.dataset.peso);
    }
    this.parentElement.parentElement.querySelectorAll('span')[0].innerHTML = caixa2.valores[this.dataset.peso].peso;
    atualizaCaixaResultados2();
  }

  function diminuiPeso() {
    if (caixa2.valores[this.dataset.peso].peso > 1) {
      caixa2.diminuiPeso(this.dataset.peso);
    }
    this.parentElement.parentElement.querySelectorAll('span')[0].innerHTML = caixa2.valores[this.dataset.peso].peso;
    atualizaCaixaResultados2();
  }

  function validaValor(x) {
    if (x == "") {
      return false;
    }
    else if (!isNaN(parseFloat(this.value))) {
      return false;
    }

    return true;
  }

  function criaElemento(x) {
    let elemento = document.createElement('div');
    let i = document.createElement('i');
    i.addEventListener('click', fecha)
    i.classList.add('fas', 'fa-times')
    let span = document.createElement('span');
    span.innerHTML = x
    elemento.appendChild(i);
    elemento.appendChild(span);
    elemento.dataset.peso = idGenerico(8);
    return (elemento)
  }

  function idGenerico(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function criaValPes() {

  }

  function criaPes() {

  }

  function fecha() {
    let filho = this.parentElement;
    let pai = filho.parentElement;
    let peso = filho.dataset.peso;
    let caixa = pai.dataset.caixa;
    if (caixa == '2') {
      let elementos = document.querySelectorAll("div [data-peso = '" + peso + "']");
      let el1 = elementos[0];
      let el2 = elementos[1];
      let el3 = elementos[2];
      el1.parentElement.removeChild(el1)
      el2.parentElement.removeChild(el2)
      el3.parentElement.removeChild(el3)
      caixa2.destroi(peso);
      atualizaCaixaResultados2();
    }
    if (caixa == '1') {
      pai.removeChild(filho);
      caixa1.destroi(peso);
      atualizaReta();
      if (caixa1.numElementos() > 0) {
        revelaBolinhas();
      } else {
        zerado();
      }
      if (caixa1.numElementos() > 0 && caixa1.min() != caixa1.max()) {
        revelaBolinhas();
      } else {
        escondeBolinhas();
      }
    }
  }

  function fnMedGeo(x) {
    let prod = 1;
    let n = x.length;
    for (var i = 0; i < x.length; i++) {
      prod *= parseFloat(x[i]);
    }
    return (Math.pow(prod, (1 / n)));
  }

  function fnMedHar(x) {
    let soma = 0;
    let tamanho = x.length
    for (var i = 0; i < x.length; i++) {
      if (parseFloat(x[i]) != 0) {
        soma += 1 / (parseFloat(x[i]));
      } else {
        soma += 0;
      }
    }
    return (tamanho / soma);
  }

  function fnMedPon(x, p) {
    let soma = 0;
    let n = 0
    for (var i = 0; i < x.length; i++) {
      soma += (parseFloat(x[i]) * parseFloat(p[i]));
      n += parseFloat(p[i]);
    }
    return (soma / n);
  }

  function fnP4() {
    if (!isNaN(parseFloat(this.value))) {
      // if(parseFloat(this.value) > 0){
      let valor = 0;
      if (!(this.value.trim() == "")) {
        valor = parseFloat(this.value);
      }
      let medGeo = fnMedGeo([9, 6, 8, 5, valor]);
      let medHar = fnMedHar([9, 6, 8, 5, valor]);
      let medPon = fnMedPon([9, 6, 8, 5, valor], [1, 2, 3, 4, 5]);
      if (valor == 0) {
        medHar = 'Não é possível calcular';
      } else {
        medHar = medHar.toFixed(2);
      }
      if (valor < 0) {
        medGeo = 'Não é possível calcular'
      } else {
        medGeo = medGeo.toFixed(2);
      }
      document.getElementById('medGeo').innerHTML = medGeo;
      document.getElementById('medHar').innerHTML = medHar;
      document.getElementById('medPon').innerHTML = medPon.toFixed(2);
      // }
      // else{
      //   document.getElementById('medGeo').innerHTML = "Não é possível calcular";
      // }

    }

  }

  function Caixa() {
    this.valores = [];
    this.temZero = function() {
      for (var x in this.valores) {
        if (this.valores[x].valor == 0) {
          return (true);
        }
      }
      return (false)
    }
    this.numElementos = function() {
      let cont = 0;
      for (var x in this.valores) {
        cont++;
      }
      return (cont);
    }
    this.aumentaPeso = function(x) {
      this.valores[x].peso = this.valores[x].peso + 1;
    }
    this.diminuiPeso = function(x) {
      this.valores[x].peso = this.valores[x].peso - 1;
    }
    this.atualiza = function(id, x, peso) {
      this.valores[id] = {
        valor: x,
        peso: peso
      }
    }
    this.destroi = function(id) {
      delete this.valores[id];
    }
    this.moda = function() {
      let ocorrencias = [];
      //Construção do array ocorrências com o número de ocorrências de cada id.
      for (var x in this.valores) {
        ocorrencias[x] = {
          ocorrencias: 0,
          valor: 0
        }
        for (var y in this.valores) {
          if (this.valores[x].valor == this.valores[y].valor) {
            ocorrencias[x].ocorrencias++;
            ocorrencias[x].valor = this.valores[x].valor;
          }
        }
      }

      //Descobrindo o número máximo de ocorrências.
      let max = -999999;
      for (var x in ocorrencias) {
        if (ocorrencias[x].ocorrencias > max) {
          max = ocorrencias[x].ocorrencias;
        }
      }
      let valoresDeModa = [];
      //Varre o ocorrências
      for (var x in ocorrencias) {
        //Verifica se o valor tem o número máximo de ocorrências.
        if (ocorrencias[x].ocorrencias == max) {
          let adiciona = true;
          //Verifica se o valor já existe no valoresDeModa
          for (var i = 0; i < valoresDeModa.length; i++) {
            if (valoresDeModa[i] == ocorrencias[x].valor) {
              adiciona = false;
            }
          }
          if (adiciona) {
            valoresDeModa.push(ocorrencias[x].valor);
          }
        }
      }

      let tipoDeModa = "amodal";
      let arrayModa = ['', 'bimodal', 'trimodal', 'multi-modal', 'pmulti-modal', 'multi-modal']
      for (var x in ocorrencias) {
        if (ocorrencias[x].ocorrencias < max) {
          tipoDeModa = arrayModa[valoresDeModa.length - 1];
        }
      }
      if (valoresDeModa.length == 1) {
        tipoDeModa = "";
      }
      return ({
        valor: valoresDeModa,
        tipoDeModa: tipoDeModa
      });
    }
    this.mediana = function() {
      let a = [];
      let casa = 0
      for (var x in this.valores) {
        a.push(this.valores[x].valor)
      }
      a.sort(function(a, b) {
        return a - b;
      });
      if (a.length % 2 == 0) {
        casa = parseInt((a.length) / 2);
        let mediana = (a[casa - 1] + a[casa]) / 2;
        return (mediana);
      } else {
        casa = parseInt((a.length + 1) / 2);
        casa = casa - 1;
        return (a[casa]);
      }
    }
    this.mediaArit = function() {
      let soma = 0;
      let tamanho = 0
      for (var x in this.valores) {
        soma = soma + this.valores[x].valor
        tamanho++;
      }
      return ((soma / tamanho).toFixed(2));
    }
    this.mediaGeom = function() {
      let prod = 1;
      let tamanho = 0;
      for (var x in this.valores) {
        prod = prod * this.valores[x].valor
        tamanho++;
      }
      return ((Math.pow(prod, (1 / tamanho))).toFixed(2));
    }
    this.mediaHarm = function() {
      let soma = 0;
      let tamanho = 0
      for (var x in this.valores) {
        soma = soma + (1 / this.valores[x].valor);
        tamanho++;
      }
      return ((tamanho / soma).toFixed(2));
    }
    this.mediaPond = function() {
      let soma = 0;
      let tamanho = 0
      for (var x in this.valores) {
        soma = soma + this.valores[x].valor * this.valores[x].peso;
        tamanho = tamanho + this.valores[x].peso;
      }
      return ((soma / tamanho).toFixed(2));
    }
    this.max = function() {
      let max = -9999999;
      for (var x in this.valores) {
        if (this.valores[x].valor > max) {
          max = this.valores[x].valor;
        }
      }
      return (max);
    }
    this.min = function() {
      let min = 9999999;
      for (var x in this.valores) {
        if (this.valores[x].valor < min) {
          min = this.valores[x].valor;
        }
      }
      return (min);
    }
  }

  function validaInput2() {
    let input = this;
    let inputValue = input.value;
    let characterTypedIn = inputValue[inputValue.length - 1]; // caracter inserido

    if (parseFloat(input.value) > 100) {
      input.value = '99';
    }
    //Não deixa digitar mais que 6 caractares.
    else if (inputValue.length > 6) {
      input.value = inputValue.slice(0, -1);
    }
    //Não deixa incluir 2 vírgulas ou dois pontos.
    else if (countChar('.', inputValue) > 1 || countChar(',', inputValue) > 1) {
      input.value = inputValue.slice(0, -1);
    }
    //Não deixa digitar caracteres que não são números.
    else if (!isNumberOrPointOrComma2(characterTypedIn)) {
      input.value = inputValue.slice(0, -1);
      if (inputValue.trim() == '') {
        // input.value = '0';
      }
    }
    //Não deixa digitar ponto se já tiver uma vírgula.
    else if (characterTypedIn == '.') {
      if (countChar(',', inputValue) > 0) {
        input.value = inputValue.slice(0, -1);
      }
    }
    //Não deixa digitar vírgula se já tiver um ponto.
    else if (characterTypedIn == ',') {
      if (countChar('.', inputValue) > 0) {
        input.value = inputValue.slice(0, -1);
      }
    } else if (inputValue.trim() == ',' || inputValue.trim() == '.') {
      input.value = inputValue.slice(0, -1);
    }
  }

  function validaInput() {
    let input = this;
    let inputValue = input.value;
    let characterTypedIn = inputValue[inputValue.length - 1]; // caracter inserido

    if (parseFloat(input.value) > 100) {
      input.value = '99';
    }
    //Não deixa digitar mais que 6 caractares.
    else if (inputValue.length > 6) {
      input.value = inputValue.slice(0, -1);
    }
    //Não deixa incluir 2 vírgulas ou dois pontos.
    else if (countChar('.', inputValue) > 1 || countChar(',', inputValue) > 1 || countChar('-', inputValue) > 1) {
      input.value = inputValue.slice(0, -1);
    }
    //Não deixa digitar caracteres que não são números.
    else if (!isNumberOrPointOrComma(characterTypedIn)) {
      input.value = inputValue.slice(0, -1);
      if (inputValue.trim() == '') {
        // input.value = '0';
      }
    }
    //Não deixa digitar ponto se já tiver uma vírgula.
    else if (characterTypedIn == '.') {
      if (countChar(',', inputValue) > 0) {
        input.value = inputValue.slice(0, -1);
      }
    }
    //Não deixa digitar vírgula se já tiver um ponto.
    else if (characterTypedIn == ',') {
      if (countChar('.', inputValue) > 0) {
        input.value = inputValue.slice(0, -1);
      }
    } else if (inputValue.trim() == ',' || inputValue.trim() == '.') {
      input.value = inputValue.slice(0, -1);
    }
  }

  function countChar(char, string) {
    let charCounter = 0;
    for (let i = 0; i < string.length; i++) {
      if (string[i] == char) {
        charCounter += 1;
      }
    }
    return (charCounter);
  }

  function isNumberOrPointOrComma2(char) {
    if (char == '0' || char == '1' || char == '2' || char == '3' || char == '4' ||
      char == '5' || char == '6' || char == '7' || char == '8' || char == '9' ||
      char == ',' || char == '.') {
      return true;
    } else {
      return false;
    }
  }

  function isNumberOrPointOrComma(char) {
    if (char == '0' || char == '1' || char == '2' || char == '3' || char == '4' ||
      char == '5' || char == '6' || char == '7' || char == '8' || char == '9' ||
      char == ',' || char == '.' || char == '-') {
      return true;
    } else {
      return false;
    }
  }

  function alimentaBolinhaModa(x) {
    let moda = document.querySelectorAll('#modaTab')[0];
    let tituloModa = document.querySelectorAll('#tituloModa')[0];
    if (x.tipoDeModa == "amodal") {
      tituloModa.innerHTML = "MODA";
      moda.innerHTML = x.tipoDeModa;
    } else if (x.tipoDeModa == "") {
      tituloModa.innerHTML = "MODA";
      moda.innerHTML = quebraComVirgulas(x.valor);
    } else {
      tituloModa.innerHTML = x.tipoDeModa;
      moda.innerHTML = quebraComVirgulas(x.valor);
    }
  }

  function quebraComVirgulas(x) {
    a = "";
    for (var i = 0; i < x.length; i++) {
      a += x[i] + ", ";
    }
    a = a.substring(0, a.length - 2);
    return (a)
  }

  function alimentaBolinhaMediana(x) {
    let mediana = document.querySelectorAll('#mediana > div:nth-of-type(1) > span:nth-of-type(2)')[0];
    mediana.innerHTML = x.toFixed(2);
  }

  function alimentaBolinhaMedia(x) {
    let media = document.querySelectorAll('#media > div:nth-of-type(3) > span:nth-of-type(2)')[0];
    media.innerHTML = x;
  }

  function btnQuadroFinal() {
    for (var i = 0; i < btnFinal.length; i++) {
      btnFinal[i].classList.remove('atual');
    }
    this.classList.add('atual');
    let blocos = document.querySelectorAll('.conteudoBotoes > div:nth-of-type(2) > div');
    for (var i = 0; i < blocos.length; i++) {
      blocos[i].classList.remove('atual');
    }
    blocos[parseInt(this.dataset.tela)].classList.add('atual');
  }

  function atualizaCaixaResultados2() {
    let caixaMedias = document.querySelectorAll('.caixaMedias')[2];
    let mediaHarmonica = caixaMedias.querySelectorAll('.mediaHarmonicaRes')[0];
    let mediaGeometrica = caixaMedias.querySelectorAll('.mediaGeometricaRes')[0];
    let mediaPonderada = caixaMedias.querySelectorAll('.mediaPonderadaRes')[0];
    if (caixa2.temZero()) {
      mediaHarmonica.innerHTML = "Não é possível calcular";
    } else {
      mediaHarmonica.innerHTML = caixa2.mediaHarm();
    }
    mediaGeometrica.innerHTML = caixa2.mediaGeom();
    mediaPonderada.innerHTML = caixa2.mediaPond();
  }

  function fnMenuLat() {
    for (var i = 0; i < menuLateral.length; i++) {
      menuLateral[i].classList.remove('atual');
    }
    this.classList.add('atual');
    // let a = document.createElement('a');
    // a.href = '#' + this.dataset.scroll;
    // a.click();
    $('html, body').animate({
      scrollTop: $('#' + this.dataset.scroll).offset().top
    }, 500);
  }

  function zerado() {
    escondeBolinhas();
    let retinhas = document.querySelectorAll('.retinhas > span');
    console.log(retinhas);
    for (var i = 0; i < retinhas.length; i++) {
      retinhas[i].innerHTML = "";
    }
    document.getElementById('mediaTab').innerHTML = "";
    document.getElementById('modaTab').innerHTML = "";
    document.getElementById('medianaTab').innerHTML = "";
  }

  window.addEventListener('scroll', function() {
    let secao1 = document.getElementById('secao3').getBoundingClientRect();
    let secao2 = document.getElementById('secao4').getBoundingClientRect();
    let secao3 = document.getElementById('secao5').getBoundingClientRect();
    let secao4 = document.getElementById('secao8').getBoundingClientRect();
    let secao5 = document.getElementById('secao9').getBoundingClientRect();
    let menu = document.querySelectorAll('.menuLateral > div');
    if (secao1.top >= 0 && secao1.bottom <= window.innerHeight) {
      for (var i = 0; i < menu.length; i++)
        menu[i].classList.remove('atual');
      menu[0].classList.add('atual')
    } else if (secao2.top >= 0 && secao2.bottom <= window.innerHeight) {
      for (var i = 0; i < menu.length; i++)
        menu[i].classList.remove('atual');
      menu[1].classList.add('atual')
    } else if (secao3.top >= 0 && secao3.bottom <= window.innerHeight) {
      for (var i = 0; i < menu.length; i++)
        menu[i].classList.remove('atual');
      menu[2].classList.add('atual');
    } else if (secao4.top >= 0 && secao4.bottom <= window.innerHeight) {
      for (var i = 0; i < menu.length; i++)
        menu[i].classList.remove('atual');
      menu[3].classList.add('atual');
    } else if (secao4.top < window.innerHeight && secao4.bottom >= 0) {
      for (var i = 0; i < menu.length; i++)
        menu[i].classList.remove('atual')
      menu[3].classList.add('atual');
    } else if (secao5.top >= 0 && secao5.bottom <= window.innerHeight) {
      for (var i = 0; i < menu.length; i++)
        menu[i].classList.remove('atual');
      menu[4].classList.add('atual')
    }
  });




})
