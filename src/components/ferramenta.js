import React, {useRef, useEffect} from "react";
import { useRouter } from 'next/router';
import {Runtime, Inspector, Library} from "@observablehq/runtime";
import notebookMapa from "@ampliasaude/mapa";
import notebookNascidosVivos from "@ampliasaude/nascidos-vivos";
import notebookCaracteristicasNascimento from "@ampliasaude/caracteristicas-nascimento";
import notebookMortalidadeInfantil from "@ampliasaude/mortalidade";
import { saveAsPng } from "save-html-as-image";
import writeXlsxFile from 'write-excel-file';

const style = `

  @import url(https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap);
  @import url(https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined); 

  #labelleft, #labelright, #labelright2, #labelleft2 {
    dominant-baseline: hanging;
    font-size: 12px;
    font-weight: 400;
    fill: #151472;
  }

  #labelleft, #labelleft2 {
    text-anchor: end;
  }

  #labelright, #labelright2 {
    text-anchor: start;
  }

  div.ferramenta {
    margin: 0px;
    min-width: 1340px;
    font-family: "Roboto Condensed";
  }

  div.blocoTrilha {
    margin: 30px;
    min-width: 1340px;
  }

  div.blocoLocal {
    margin: 0px 20px;
    height: 64px;
  }

  div.blocoMenu {
    margin: 0px 20px;
  }

  div.mainWindow {
    white-space: normal;
    box-sizing: content-box;
    line-height: 1;
  }

  .trilhas .bt-trilhas {
    stroke: #ffffff;
    color: #ffffff;
    background-color: #151472;
  }
  
  .mapa .bt-trilhas {
    stroke: #151472;
    color: #151472;
    background-color: #E0E0E0;
  }
  
  .trilhas .bt-mapa {
    fill: #151472;
    color: #151472;
    background-color: #E0E0E0;
  }
  
  .mapa .bt-mapa {
    fill: #ffffff;
    color: #ffffff;
    background-color: #151472;
  }

  svg {
    font-family: "Roboto Condensed";
  }

  div.menu-vis {
    box-sizing: border-box;
    background-color: #eee;
    display: flex;
    padding: 5px 156px;
    gap: 10px;
    align-items: center;  
  }

  div.bt {
    display: flex;
    align-items: center;
    padding: 5px 20px;
    font-size: 14px;
    font-weight: 400;
    gap: 8px;
    border-radius: 50px;
  }
  
  div.top-buttons {
    display: flex;
    gap: 6px;
    border-left: 1px #bababa solid;
    padding: 0px 20px;
  }
  
  div.spacer {
    flex-grow: 1;
  }

  .btn-remove {
    box-sizing: border-box;
  }

  div.saveImg {
    background-color: #fff;
  }

`;

let mainNotebook = null;

const downloadSchemaMapa = [
  {
    column: 'cod',
    type: Number,
    format: '000000',
    value: d => +d.cod,
    width: 12
  },
  {
    column: 'nome',
    type: String,
    value: d => d.nome,
    width: 40
  },
  {
    column: 'uf',
    type: String,
    value: d => d.uf,
    width: 12
  },
  {
    column: 'região',
    type: String,
    value: d => d.regiao,
    width: 12
  },
  {
    column: 'idh',
    type: Number,
    format: '0.00',
    value: d => +d.IDH,
    width: 12
  },
  {
    column: 'ano',
    type: Number,
    format: '###0',
    value: d => +d.ANO,
    width: 12
  },
  {
    column: 'avg_pm25',
    type: Number,
    format: '0.00',
    value: d => +d.AVG_PM25,
    width: 12
  },
  {
    column: 'min_pm25',
    type: Number,
    format: '0.00',
    value: d => +d.MIN_PM25,
    width: 12
  },
  {
    column: 'max_pm25',
    type: Number,
    format: '0.00',
    value: d => +d.MAX_PM25,
    width: 12
  },
  {
    column: 'baixo_peso',
    type: Number,
    format: '###0',
    value: d => +d.BAIXO_PESO,
    width: 12
  },
  {
    column: 'nasc_total',
    type: Number,
    format: '###0',
    value: d => +d.TOTAL,
    width: 12
  },
  {
    column: 'obt_peri',
    type: Number,
    format: '###0',
    value: d => +d.OBITOS_PERINATAIS,
    width: 12
  },
  {
    column: 'obt_neo',
    type: Number,
    format: '###0',
    value: d => +d.OBITOS_NEONATAIS,
    width: 12
  },
  {
    column: 'obt_infant',
    type: Number,
    format: '###0',
    value: d => +d.OBITOS_INFANTIS,
    width: 12
  }
];

let makeDownloadData = null;
let linkParam = ()=>"";

function menuListener(inspector, router) {
    inspector._chain = inspector.fulfilled;
    inspector.fulfilled = function(value, name) {
        let locale = router.query.locale;
        value.addEventListener("aba",ev=>{
            if(ev.detail.index == 1) {
              router.push(`NascidosVivos?locale=${locale}`);
            } else if(ev.detail.index == 2) {
              router.push(`CaracteristicasNascimento?locale=${locale}`);
            } else if(ev.detail.index == 3) {
              router.push(`MortalidadeInfantil?locale=${locale}`);
            }
        });
        return this._chain(value, name);
    }
    return inspector;
}

function adjustObservableWidth(visRef) {
    const library = new Library();
    mainNotebook.redefine("width", library.Generators.observe(notify => {
      let width = null;
      function resized() {
        if(visRef.current) {
            let newWidth = Math.max(visRef.current.clientWidth,1340);
            if (newWidth !== width) {
              notify(width = newWidth);
            }
        } else {
            setTimeout(resized,10);
        }
      }
      addEventListener("resize", resized);
      setTimeout(resized);
      return () => removeEventListener("resize", resized);
    }));

    mainNotebook.value("linkParam")
      .then(f=>{linkParam=f})
      .catch(err=>{})
    ;
  }

export function Mapa() {
  return ShadowRoot(<MapaInternal/>);
}

export function MapaInternal() {
  const mainWindowRef = useRef();
  const allStylesRef = useRef();
  const stylesRef = useRef();

  useEffect(() => {
    const runtime = new Runtime();
    let main = runtime.module(notebookMapa, name => {
      if (name === "mainWindow") return new Inspector(mainWindowRef.current);
      if (name === "allStyles") return new Inspector(allStylesRef.current);
      if (name === "styles") return new Inspector(stylesRef.current);
      return ["clearMainWindow","panel","populate","afterInitialLayout","populateMapa","viewof dorling","viewof colorSelect", "color", "dorlingCircleConf","storageUpdate","scatterConfig","biglayoutToggle","updateScatterConfig","reactToMunSelecionados","xaxis","yaxis","initialLoad"].includes(name);
    });
    mainNotebook = main;
    adjustObservableWidth(mainWindowRef);
    return () => runtime.dispose();
  }, []);

  return (
    <div className="ferramenta">
      <div className="mapa">
        <MenuFerramenta />
        <div className="saveImg" ref={mainWindowRef} style={{boxSizing:"content-box",whiteSpace:"normal"}}/>
        <div ref={allStylesRef} />
        <div ref={stylesRef} />
      </div>
    </div> 
  );
}

function ShadowRoot(tag) {
  const divRef = useRef(null);

  useEffect(() => {
    if(divRef.current) {
      let s = document.getElementById("estiloFerramenta");
      if(!s) {
        s = document.createElement("style");
        s.setAttribute("id","estiloFerramenta");
        s.textContent = style;
        document.head.appendChild(s);
      }
    }
  }, []);

  return <div ref={divRef}>{tag}</div>
}

export function NascidosVivos() {
  return ShadowRoot(<NascidosVivosInternal/>);
}

function NascidosVivosInternal() {
  const mpRef = useRef();
  const div_controlesRef = useRef();
  const visRef = useRef();
  const styleRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const runtime = new Runtime();
    const main = runtime.module(notebookNascidosVivos, name => {
      if (name === "mp") return menuListener(new Inspector(mpRef.current),router);
      if (name === "div_controles") return new Inspector(div_controlesRef.current);
      if (name === "vis") return new Inspector(visRef.current);
      if (name === "style") return new Inspector(styleRef.current);
      return ["menu_municipios","barra_municipios","gPESO","funcoesGeradoras","gPIG","gTOTAL","checkFiltros","onfirstload","getCurrentConf","cabecalho","width"].includes(name);
    });
    mainNotebook = main;
    adjustObservableWidth(visRef);
    return () => runtime.dispose();
  }, []);

  return (
    <div className="ferramenta">
      <div className="trilhas">
        <MenuFerramenta />
        <div className="mainWindow">
          <div className="blocoLocal" ref={div_controlesRef} />
          <div className="blocoMenu" ref={mpRef} />
          <div className="blocoTrilha saveImg" ref={visRef} />
          <div ref={styleRef} />
        </div>
      </div>
    </div>
  );
}

export function CaracteristicasNascimento() {
  return ShadowRoot(<CaracteristicasNascimentoInternal/>);
}

function CaracteristicasNascimentoInternal() {

  const visRef = useRef();
  const mpRef = useRef();
  const div_controlesRef = useRef();
  const styleRef = useRef();
  const router = useRouter();  

  useEffect(() => {
    const runtime = new Runtime();
    let main = runtime.module(notebookCaracteristicasNascimento, name => {
      if (name === "mp") return menuListener(new Inspector(mpRef.current),router);
      if (name === "vis") return new Inspector(visRef.current);
      if (name === "div_controles") return new Inspector(div_controlesRef.current);
      if (name === "style") return new Inspector(styleRef.current);
      return ["menu_municipios","barra_municipios","gPESO","funcoesGeradoras","gROBSON","gTOTAL","checkFiltros","onfirstload","getCurrentConf","cabecalho"].includes(name);
    });
    mainNotebook = main;
    adjustObservableWidth(visRef);
    return () => runtime.dispose();
  }, []);

  return (
    <div className="ferramenta">
      <div className="trilhas">
        <MenuFerramenta />
        <div  className="mainWindow">
          <div className="blocoLocal" ref={div_controlesRef} />
          <div className="blocoMenu" ref={mpRef} />
          <div className="blocoTrilha saveImg" ref={visRef} />
          <div ref={styleRef} />
        </div>
      </div>
    </div>
  );
}

export function MortalidadeInfantil() {
  return ShadowRoot(<MortalidadeInfantilInternal/>);
}

function MortalidadeInfantilInternal() {
  const visRef = useRef();
  const mpRef = useRef();
  const div_controlesRef = useRef();
  const styleRef = useRef();
  const router = useRouter();  

  useEffect(() => {
    const runtime = new Runtime();
    let main = runtime.module(notebookMortalidadeInfantil, name => {
      if (name === "mp") return menuListener(new Inspector(mpRef.current),router);
      if (name === "vis") return new Inspector(visRef.current);
      if (name === "div_controles") return new Inspector(div_controlesRef.current);
      if (name === "style") return new Inspector(styleRef.current);
      return ["menu_municipios","barra_municipios","gPESO","funcoesGeradoras","gROBSON","gTOTAL","checkFiltros","onfirstload","getCurrentConf","cabecalho"].includes(name);
    });
    mainNotebook = main;
    adjustObservableWidth(visRef);
    return () => runtime.dispose();
  }, []);

  return (
    <div className="ferramenta">
      <div className="trilhas">
        <MenuFerramenta />
        <div className="mainWindow">
          <div className="blocoLocal" ref={div_controlesRef} />
          <div className="blocoMenu" ref={mpRef} />
          <div className="blocoTrilha saveImg" ref={visRef} />
          <div ref={styleRef} />
        </div>
      </div>
    </div>
  );
}

function MenuFerramenta() {

  const router = useRouter();

  function saveImage() {
    let e = document.querySelector(".saveImg");
    if(e) {
      let btns = document.querySelectorAll(".btn-remove");
      for(let btn of btns) {
        if(!btn.classList.contains("remove-when-downloading")) {
          btn.classList.add("remove-when-downloading");
        }
      }
      let novaTrilha = document.querySelector("#novatrilha");
      if(novaTrilha && !novaTrilha.classList.contains("remove-when-downloading")) {
        novaTrilha.classList.add("remove-when-downloading");
      }
      saveAsPng(e);
    }
  }

  function mapaClick() {
    let locale = router.query.locale;
    router.push(`Mapa?locale=${locale}`);
  }
  
  function trilhaClick() {
    let locale = router.query.locale;
    router.push(`NascidosVivos?locale=${locale}`);
  }

  function copyLink() {
    let url = window.location.href.split('?')[0]
    let param = linkParam();
    if(param.length) {
      param = "?"+param
    }
    let fakeElem = document.body.appendChild(document.createElement("textarea"));
    fakeElem.style.position = "absolute";
    fakeElem.style.left = "-9999px";
    fakeElem.setAttribute("readonly", "");
    fakeElem.value = `${url}${param}`;
    fakeElem.select();
    document.execCommand("copy");
    fakeElem.parentNode.removeChild(fakeElem);
  }
  
  function downloadDados() {
    if(mainNotebook) {
      mainNotebook.value("makeDownloadData")
        .then(makeDownloadData=>{
          let data = makeDownloadData();
          let schema = downloadSchemaMapa;
          let fileName = schema === downloadSchemaMapa ? `dados-mapa-${data[0].ANO}.xlsx` : 'file.xlsx';
          writeXlsxFile(data, { schema, fileName });
        })
        .catch(err=>{alert("Download não implementado para as trilhas")})
      ;
    }
  }

  return (
    <div className="menu-vis">
      <div className="bt bt-mapa" onClick={mapaClick}>
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.0463 5.56474L20.3458 7.11382C20.3733 7.25614 20.3316 7.4032 20.2342 7.51162L19.1251 8.72521L18.1935 9.75057L18.0629 11.7556C18.0582 11.8253 18.0377 11.8929 18.0031 11.9537L16.805 14.0484C16.7522 14.1405 16.6691 14.2115 16.57 14.2494L15.3808 14.7036L13.4687 15.5266L13.3741 16.4042C13.3667 16.472 13.3443 16.5374 13.3085 16.5956L12.4628 17.9686C12.4551 17.9813 12.4468 17.9934 12.4378 18.0051L11.9445 18.6564C11.8838 18.7364 11.8007 18.792 11.709 18.8194L11.6808 18.9072C11.6645 18.9578 11.6395 19.0053 11.6069 19.0472L11.0077 19.8217C10.9192 19.9362 10.7838 20 10.644 20C10.5944 20 10.5441 19.992 10.4955 19.9752C10.3093 19.9117 10.1843 19.7371 10.1843 19.5406V19.1902L10.1244 19.1031L9.18958 18.3831L8.74971 18.2315C8.60805 18.1828 8.49903 18.0681 8.45773 17.9243C8.41644 17.7806 8.44765 17.6256 8.54177 17.5092L9.86913 15.8645L9.83151 15.8189C9.76348 15.7366 9.72635 15.6333 9.72635 15.5266V15.1969L9.59284 15.1558C9.43149 15.106 9.31031 14.9722 9.27734 14.8068L9.21219 14.4811L8.51411 14.3193C8.33594 14.2779 8.19924 14.135 8.16594 13.9555L7.9897 13.0049C7.97849 12.9445 7.97945 12.8826 7.99274 12.8225L8.17539 11.9944L8.06109 11.8476C8.02187 11.7971 7.99354 11.7392 7.97801 11.677L7.90646 11.3911H7.45487C7.24116 11.3911 7.05579 11.2441 7.00713 11.0362L6.89876 10.573L6.57557 10.0052L4.79892 9.3759C4.64092 9.32009 4.52599 9.18257 4.49894 9.01754L4.42706 8.58016L3.74595 9.08357C3.66655 9.14226 3.57066 9.1736 3.4727 9.1736C3.45701 9.1736 3.44116 9.17264 3.42564 9.17104L2.22749 9.04791C1.99315 9.02392 1.81483 8.82644 1.81483 8.59105V8.54995L1.10728 8.34575C1.0162 8.31936 0.935358 8.26547 0.875971 8.19143L0.100726 7.22334C0.00340109 7.10163 -0.0257313 6.93917 0.0235708 6.79125L0.42888 5.57671C0.468417 5.45838 0.554219 5.36115 0.666911 5.30758L1.84732 4.74436C1.88286 4.72741 1.92047 4.7151 1.95905 4.70774L2.12857 3.76508L1.86397 3.53129C1.73799 3.41967 1.68292 3.2484 1.72054 3.08449L1.96721 2.0107C2.01155 1.81721 2.17515 1.67441 2.373 1.65602L3.51833 1.55032C3.53242 1.5492 3.54666 1.54856 3.56059 1.54856C3.67824 1.54856 3.79238 1.59397 3.87818 1.67601L4.15015 1.93603H4.71791L4.91576 1.66338L4.55479 1.04149C4.46067 0.879513 4.47476 0.676426 4.59017 0.528507C4.67885 0.41529 4.81332 0.351964 4.95258 0.351964C4.99516 0.351964 5.03806 0.35788 5.08 0.370034L5.83349 0.587035L7.03582 0.0412568C7.09648 0.0135925 7.16132 0 7.22599 0C7.31291 0 7.39967 0.0244684 7.4749 0.0730817C7.60632 0.157356 7.68572 0.303036 7.68572 0.45911L7.68556 1.24171L8.0803 1.74512L9.03836 1.54171L9.18131 1.34774C9.26871 1.22924 9.40669 1.16096 9.55124 1.16096C9.57541 1.16096 9.59958 1.16288 9.62375 1.16672L10.5387 1.31255L11.1702 0.3032C11.2544 0.168717 11.4019 0.0873206 11.5602 0.0873206H11.5686C11.7302 0.0903581 11.8782 0.177989 11.9588 0.317753L12.8398 1.84906C12.9082 1.96803 12.9198 2.11116 12.8717 2.23924L12.713 2.66172C12.6722 2.77014 12.5918 2.85937 12.4881 2.91118L12.1033 3.10356C12.2282 3.16064 12.3252 3.27258 12.3594 3.41379L12.3868 3.52652L12.5814 3.5027L13.523 2.80115C13.604 2.74086 13.7005 2.71016 13.7979 2.71016C13.8725 2.71016 13.9472 2.72839 14.0154 2.76501L15.1808 3.39057L15.6409 3.59478C15.6585 3.60262 15.6757 3.61157 15.6922 3.62165L16.252 3.96018H17.41C17.5205 3.96018 17.6269 3.99984 17.7105 4.0718L18.8937 5.09204L19.6575 5.19679C19.8526 5.22365 20.0088 5.37141 20.0463 5.56474Z" fill="white"/>
        </svg>
        Escolha municípios
      </div>
  
      <div className="bt bt-trilhas" onClick={trilhaClick}>
        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.35413 0V16C1.35413 17.1046 2.24956 18 3.35413 18H19.3541"/>
          <path d="M4.92517 13.2853L6.51341 9.2739L8.2529 11.7425L10.4462 9.47962L13.0932 9.53104L16.0428 5.57104L19.068 6.08533" strokeWidth="2"/>
        </svg>
        Explore os dados
      </div>
    
    <div className='spacer'/>
    
    <div className='top-buttons'>
      <svg onClick={saveImage} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.354 10C20.354 15.5228 15.8769 20 10.354 20C4.83116 20 0.354004 15.5228 0.354004 10C0.354004 4.47715 4.83116 0 10.354 0C15.8769 0 20.354 4.47715 20.354 10Z" fill="#151472"/>
        <path d="M7.354 9L4.354 13H16.854L13.854 7L11.854 9.5L9.854 12L7.354 9Z" fill="#EEEEEE" stroke="#EEEEEE"/>
      </svg>
  
      <svg onClick={downloadDados} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.354 10C20.354 15.5228 15.8769 20 10.354 20C4.83116 20 0.354004 15.5228 0.354004 10C0.354004 4.47715 4.83116 0 10.354 0C15.8769 0 20.354 4.47715 20.354 10Z" fill="#151472"/>
        <path d="M10.0005 12.3536C10.1957 12.5488 10.5123 12.5488 10.7076 12.3536L13.8895 9.17157C14.0848 8.97631 14.0848 8.65973 13.8895 8.46447C13.6943 8.2692 13.3777 8.2692 13.1824 8.46447L10.354 11.2929L7.52558 8.46447C7.33031 8.2692 7.01373 8.2692 6.81847 8.46447C6.62321 8.65973 6.62321 8.97631 6.81847 9.17157L10.0005 12.3536ZM10.854 12L10.854 5L9.854 5L9.854 12L10.854 12Z" fill="#EEEEEE"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M4.354 10V14C4.354 14.5523 4.80172 15 5.354 15H15.354C15.9063 15 16.354 14.5523 16.354 14V10H15.354V14H5.354L5.354 10H4.354Z" fill="#EEEEEE"/>
      </svg>
  
      <svg onClick={copyLink} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.354 10C20.354 15.5228 15.8769 20 10.354 20C4.83116 20 0.354004 15.5228 0.354004 10C0.354004 4.47715 4.83116 0 10.354 0C15.8769 0 20.354 4.47715 20.354 10Z" fill="#151472"/>
        <path d="M6.399 10C6.399 11.026 7.1635 11.86 8.104 11.86H10.304V13H8.104C6.586 13 5.354 11.656 5.354 10C5.354 8.344 6.586 7 8.104 7H10.304V8.14H8.104C7.1635 8.14 6.399 8.974 6.399 10ZM8.654 9.4H13.054V10.6H8.654V9.4ZM13.604 13H11.404V11.86H13.604C14.5445 11.86 15.309 11.026 15.309 10C15.309 8.974 14.5445 8.14 13.604 8.14H11.404V7H13.604C15.122 7 16.354 8.344 16.354 10C16.354 11.656 15.122 13 13.604 13Z" fill="#EEEEEE"/>
      </svg>
  
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.354 10C20.354 15.5228 15.8769 20 10.354 20C4.83116 20 0.354004 15.5228 0.354004 10C0.354004 4.47715 4.83116 0 10.354 0C15.8769 0 20.354 4.47715 20.354 10Z" fill="#151472"/>
        <path d="M16.354 7.125C16.354 6.50625 15.814 6 15.154 6H5.554C4.894 6 4.354 6.50625 4.354 7.125V13.875C4.354 14.4938 4.894 15 5.554 15H15.154C15.814 15 16.354 14.4938 16.354 13.875V7.125ZM15.154 7.125L10.354 9.9375L5.554 7.125H15.154ZM15.154 13.875H5.554V8.25L10.354 11.0625L15.154 8.25V13.875Z" fill="#EEEEEE"/>
      </svg>
  
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.354 10C20.354 15.5228 15.8769 20 10.354 20C4.83116 20 0.354004 15.5228 0.354004 10C0.354004 4.47715 4.83116 0 10.354 0C15.8769 0 20.354 4.47715 20.354 10Z" fill="#151472"/>
        <path d="M7.429 6.97826C7.429 7.51865 6.9665 7.95652 6.39567 7.95652C5.82484 7.95652 5.36234 7.51865 5.36234 6.97826C5.36234 6.43826 5.82484 6 6.39567 6C6.9665 6 7.429 6.43826 7.429 6.97826ZM7.43734 8.73913H5.354V15H7.43734V8.73913ZM10.7632 8.73913H8.69317V15H10.7636V11.7134C10.7636 9.88604 13.2757 9.73657 13.2757 11.7134V15H15.354V11.0357C15.354 7.95222 11.6365 8.06452 10.7632 9.58239V8.73913Z" fill="#EEEEEE"/>
      </svg>
  
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.354 10C20.354 15.5228 15.8769 20 10.354 20C4.83116 20 0.354004 15.5228 0.354004 10C0.354004 4.47715 4.83116 0 10.354 0C15.8769 0 20.354 4.47715 20.354 10Z" fill="#151472"/>
        <path d="M8.604 8.33333H7.354V10H8.604V15H10.6873V10H12.2048L12.354 8.33333H10.6873V7.63875C10.6873 7.24083 10.7673 7.08333 11.1519 7.08333H12.354V5H10.7673C9.269 5 8.604 5.65958 8.604 6.92292V8.33333Z" fill="#EEEEEE"/>
      </svg>
  
      <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.354 10C20.354 15.5228 15.8769 20 10.354 20C4.83116 20 0.354004 15.5228 0.354004 10C0.354004 4.47715 4.83116 0 10.354 0C15.8769 0 20.354 4.47715 20.354 10Z" fill="#151472"/>
        <path d="M16.354 7.06547C15.9493 7.24636 15.5143 7.36818 15.0578 7.42309C15.524 7.14207 15.8819 6.69678 16.0501 6.16612C15.6143 6.42637 15.1312 6.61557 14.6169 6.71755C14.2058 6.27594 13.6187 6 12.9697 6C11.5126 6 10.442 7.36864 10.771 8.78943C8.896 8.69483 7.23317 7.7904 6.11988 6.41576C5.52863 7.43694 5.81325 8.77282 6.81792 9.44929C6.4485 9.43729 6.10017 9.33532 5.7963 9.16504C5.77155 10.2176 6.52092 11.2023 7.60625 11.4215C7.28863 11.5083 6.94075 11.5286 6.58692 11.4603C6.87384 12.3628 7.70709 13.0195 8.69525 13.0379C7.7465 13.7869 6.55117 14.1214 5.354 13.9793C6.35271 14.6239 7.53934 15 8.8135 15C13.0036 15 15.3709 11.4372 15.2279 8.24169C15.6688 7.92099 16.0515 7.52092 16.354 7.06547Z" fill="#EEEEEE"/>
      </svg>  
    </div>
  </div> );
}

