import React, { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { RiAddFill } from "react-icons/ri";
import { db } from "../auth/Config";
import { ModalLarge, ModalSmall } from "./Modal";

const RitualsCard = (record) => {
  const [isModalCreateRitual, setIsModalCreateRitual] = useState(false);
  const [infoCreateRituals, setInfoCreateRituals] = useState({
    name: "",
    element: "",
    reach: "",
    duration: "",
    execution: "",
    target: "",
    resistance: "",
    circle: "",
    description: "",
  });
  const [isModalVisibleDamage, setIsModalVisibleDamage] = useState(false);
  const [damages, setDamages] = useState([]);
  const [getRituals, setGetRituals] = useState([]);
  const [show, setShow] = useState(false);
  const [result, setResult] = useState({});

  useEffect(() => {
    getDocAllRituals();
  }, []);

  async function getDocAllRituals() {
    const { docs } = await db
      .collection("rituals")
      .where("uid", "==", record.value.uid)
      .get();
    setGetRituals(docs[0].data());
  }

  const rituals = [
    { value: "", label: "Escolha um Ritual" },
    { value: "Amaldiçoar Arma", label: "Amaldiçoar Arma" },
    { value: "Compreensão Paranormal", label: "Compreensão Paranormal" },
    { value: "Enfeitiçar", label: "Enfeitiçar" },
    { value: "Perturbação", label: "Perturbação" },
    { value: "Ouvir os Sussuros", label: "Ouvir os Sussuros" },
    { value: "Tecer Ilusão", label: "Tecer Ilusão" },
    { value: "Terceiro Olho", label: "Terceiro Olho" },
    { value: "Amaldiçoar Tecnologia", label: "Amaldiçoar Tecnologia" },
    { value: "Coincidência Forçada", label: "Coincidência Forçada" },
    { value: "Eletrocussão", label: "Eletrocussão" },
    { value: "Embaralhar", label: "Embaralhar" },
    { value: "Luz", label: "Luz" },
    { value: "Polarização Caótica", label: "Polarização Caótica" },
    { value: "Cicatrização", label: "Cicatrização" },
    { value: "Consumir Manacial", label: "Consumir Manacial" },
    { value: "Decadência", label: "Decadência" },
    { value: "Definhar", label: "Definhar" },
    { value: "Espirais da Perdição", label: "Espirais da Perdição" },
    { value: "Nuvem de Cinzas", label: "Nuvem de Cinzas" },
    { value: "Armadura de Sangue", label: "Armadura de Sangue" },
    { value: "Corpo Adaptado", label: "Corpo Adaptado" },
    { value: "Distorcer Aparência", label: "Distorcer Aparência" },
    { value: "Fortalecimento Sensorial", label: "Fortalecimento Sensorial" },
    { value: "Ódio Incontrolável", label: "Ódio Incontrolável" },
    { value: "Cinerária", label: "Cinerária" },
    { value: "Aprimorar Mente", label: "Aprimorar Mente" },
    { value: "Detecção de Ameaças", label: "Detecção de Ameaças" },
    { value: "Esconder dos Olhos", label: "Esconder dos Olhos" },
    { value: "Invadir Mente", label: "Invadir Mente" },
    { value: "Localização", label: "Localização" },
    { value: "Chamas do Caos", label: "Chamas do Caos" },
    { value: "Contenção Fantasmagórica", label: "Contenção Fantasmagórica" },
    { value: "Dissonância Acústica", label: "Dissonância Acústica" },
    { value: "Sopro do Caos", label: "Sopro do Caos" },
    { value: "Tela de Ruído", label: "Tela de Ruído" },
    { value: "Desacelerar Impacto", label: "Desacelerar Impacto" },
    { value: "Eco Espiral", label: "Eco Espiral" },
    { value: "Paradoxo", label: "Paradoxo" },
    { value: "FogueMiasma Entrópicote", label: "Miasma Entrópico" },
    { value: "Velocidade Mortal", label: "Velocidade Mortal" },
    { value: "Aprimorar Físico", label: "Aprimorar Físico" },
    { value: "Descarnar", label: "Descarnar" },
    { value: "Flagelo de Sangue", label: "Flagelo de Sangue" },
    { value: "Hemofagia", label: "Hemofagia" },
    { value: "Transfusão Vital", label: "Transfusão Vital" },
    { value: "Proteção Contra Rituais", label: "Proteção Contra Rituais" },
    { value: "Rejeitar Névoa", label: "Rejeitar Névoa" },
    { value: "Purgatório", label: "Purgatório" },
    { value: "Vomitar Pestes", label: "Vomitar Pestes" },
    { value: "Dissipar Ritual", label: "Dissipar Ritual" },
    { value: "Alterar Memória", label: "Alterar Memória" },
    { value: "Contato Paranormal", label: "Contato Paranormal" },
    { value: "Mergulhar Mental", label: "Mergulhar Mental" },
    { value: "Vidência", label: "Vidência" },
    { value: "Convocação Instantânea", label: "Convocação Instantânea" },
    { value: "Salto Fantasma", label: "Salto Fantasma" },
    { value: "Transfigurar Água", label: "Transfigurar Água" },
    { value: "FoguTransfigurar Teraete", label: "Transfigurar Tera" },
    { value: "Âncora Temporal", label: "Âncora Temporal" },
    { value: "Poeira da Podridão", label: "Poeira da Podridão" },
    { value: "Tentáculos de Lodo", label: "Tentáculos de Lodo" },
    { value: "Zerar Entropia", label: "Zerar Entropia" },
    { value: "Ferver Sangue", label: "Ferver Sangue" },
    { value: "Forma Monstruosa", label: "Forma Monstruosa" },
    { value: "Controle Mental", label: "Controle Mental" },
    { value: "Inexistir", label: "Inexistir" },
    { value: "Possessão", label: "Possessão" },
    { value: "Alterar Destino", label: "Alterar Destino" },
    { value: "Deflagração de Energia", label: "Deflagração de Energia" },
    { value: "Teletransporte", label: "Teletransporte" },
    { value: "Convocar o Algoz", label: "Convocar o Algoz" },
    { value: "Fim Inevitável", label: "Fim Inevitável" },
    { value: "Capturar o Coração", label: "Capturar o Coração" },
    { value: "Invólucro de Carne", label: "Invólucro de Carne" },
    { value: "Vínculo de Sangue", label: "Vínculo de Sangue" },
    { value: "Canalizar o Medo", label: "Canalizar o Medo" },
    { value: "Conhecendo o Medo", label: "Conhecendo o Medo" },
    { value: "Lâmina do Medo", label: "Lâmina do Medo" },
    { value: "Medo Tángivel", label: "Medo Tángivel" },
    { value: "Presença do Medo", label: "Presença do Medo" },
  ];

  const elementRituals = [
    { value: "", label: "Escolha o Elemento do Ritual" },
    { value: "Conhecimento", label: "Conhecimento" },
    { value: "Energia", label: "Energia" },
    { value: "Morte", label: "Morte" },
    { value: "Sangue", label: "Sangue" },
  ];

  const search = [
    { value: "", label: "Escolha o alcance" },
    { value: "Pessoal", label: "Pessoal" },
    { value: "Toque", label: "Toque" },
    { value: "Curto", label: "Curto" },
    { value: "Médio", label: "Médio" },
    { value: "Longo", label: "Longo" },
    { value: "Extremo", label: "Extremo" },
    { value: "Ilimitado", label: "Ilimitado" },
  ];

  const scene = [
    { value: "", label: "Escolha a Duração" },
    { value: "Instantãnea", label: "Instantãnea" },
    { value: "Cena", label: "Cena" },
    { value: "Sustentada", label: "Sustentada" },
    { value: "Duração Definida", label: "Duração Definida" },
    { value: "Permanente", label: "Permanente" },
    { value: "Alvos, Efeitos e Áreas", label: "Alvos, Efeitos e Áreas" },
    { value: "Descarregar", label: "Descarregar" },
    { value: "Encerrando seus Riturais", label: "Encerrando seus Riturais" },
    { value: "Morte e Duração", label: "Morte e Duração" },
  ];

  const circle = [
    { value: "", label: "Escolha o Nivel do Circulo" },
    { value: "1º", label: "1º Círculo" },
    { value: "2º", label: "2º Círculo" },
    { value: "3º", label: "3º Círculo" },
    { value: "4º", label: "4º Círculo" },
  ];

  const resistance = [
    { value: "", label: "Escolha a Resistência" },
    { value: "Sim", label: "Sim" },
    { value: "Não", label: "Não" },
  ];

  const iconMap = {
    "Amaldiçoar Arma": <img src="/symbols/AmaldicoarArma.png" alt="" />,
    "Compreensão Paranormal": (
      <img src="/symbols/CompreensaoParanormal.png" alt="" />
    ),
    Enfeitiçar: <img src="/symbols/Enfeiticar.png" alt="" />,
    Perturbação: <img src="/symbols/Perturbacao.png" alt="" />,
    "Ouvir os Sussuros": <img src="/symbols/OuvirOsSussurros.png" alt="" />,
    "Tecer Ilusão": <img src="/symbols/TecerIlusao.png" alt="" />,
    "Terceiro Olho": <img src="/symbols/TerceiroOlho.png" alt="" />,
    "Amaldiçoar Tecnologia": (
      <img src="/symbols/AmaldicoarTecnologia.png" alt="" />
    ),
    "Coincidência Forçada": (
      <img src="/symbols/CoincidenciaForçada.png" alt="" />
    ),
    Eletrocussão: <img src="/symbols/Eletrocussao.png" alt="" />,
    Embaralhar: <img src="/symbols/Embaralhar.png" alt="" />,
    Luz: <img src="/symbols/Luz.png" alt="" />,
    "Polarização Caótica": <img src="/symbols/PolarizacaoCaotica.png" alt="" />,
    Cicatrização: <img src="/symbols/Cicatrização.png" alt="" />,
    "Consumir Manacial": <img src="/symbols/ConsumirManancial.png" alt="" />,
    Decadência: <img src="/symbols/Decadencia.png" alt="" />,
    Definhar: <img src="/symbols/Definhar.png" alt="" />,
    "Espirais da Perdição": (
      <img src="/symbols/EspiraisDaPerdicao.png" alt="" />
    ),
    "Nuvem de Cinzas": <img src="/symbols/NuvemDeCinzas.png" alt="" />,
    "Armadura de Sangue": <img src="/symbols/ArmaduraDeSangue.png" alt="" />,
    "Corpo Adaptado": <img src="/symbols/CorpoAdaptado.png" alt="" />,
    "Distorcer Aparência": <img src="/symbols/DistorcerAparencia.png" alt="" />,
    "Fortalecimento Sensorial": (
      <img src="/symbols/FortalecimentoSensorial.png" alt="" />
    ),
    "Ódio Incontrolável": <img src="/symbols/OdioIncontrolavel.png" alt="" />,
    Cinerária: <img src="/symbols/Cineraria.png" alt="" />,
    "Aprimorar Mente": <img src="/symbols/AprimorarMente.png" alt="" />,
    "Detecção de Ameaças": <img src="/symbols/DeteccaoDeAmeacas.png" alt="" />,
    "Esconder dos Olhos": <img src="/symbols/EsconderDosOlhos.png" alt="" />,
    "Invadir Mente": <img src="/symbols/InvadirMente.png" alt="" />,
    Localização: <img src="/symbols/Localização.png" alt="" />,
    "Chamas do Caos": <img src="/symbols/ChamasDoCaos.png" alt="" />,
    "Contenção Fantasmagórica": (
      <img src="/symbols/ContencaoFantasmagorica.png" alt="" />
    ),
    "Dissonância Acústica": (
      <img src="/symbols/DissonanciaAcustica.png" alt="" />
    ),
    "Sopro do Caos": <img src="/symbols/SoproDoCaos.png" alt="" />,
    "Tela de Ruído": <img src="/symbols/TelaDeRuido.png" alt="" />,
    "Desacelerar Impacto": <img src="/symbols/" alt="" />,
    "Eco Espiral": <img src="/symbols/EcoEspiral.png" alt="" />,
    Paradoxo: <img src="/symbols/Paradoxo.png" alt="" />,
    "Miasma Entrópico": <img src="/symbols/MiasmaEntropico.png" alt="" />,
    "Velocidade Mortal": <img src="/symbols/VelocidadeMortal.png" alt="" />,
    "Aprimorar Físico": <img src="/symbols/AprimorarFisico.png" alt="" />,
    Descarnar: <img src="/symbols/Descarnar.png" alt="" />,
    "Flagelo de Sangue": <img src="/symbols/FlageloDeSangue.png" alt="" />,
    Hemofagia: <img src="/symbols/Hemofagia.png" alt="" />,
    "Transfusão Vital": <img src="/symbols/TransfusaoVital.png" alt="" />,
    "Proteção Contra Rituais": (
      <img src="/symbols/ProtecaoContraRituais.png" alt="" />
    ),
    "Rejeitar Névoa": <img src="/symbols/RejeitarNevoa.png" alt="" />,
    Purgatório: <img src="/symbols/Purgatorio.png" alt="" />,
    "Vomitar Pestes": <img src="/symbols/VomitarPestes.png" alt="" />,
    "Dissipar Ritual": <img src="/symbols/DissiparRitual.png" alt="" />,
    "Alterar Memória": <img src="/symbols/AlterarMemoria.png" alt="" />,
    "Contato Paranormal": <img src="/symbols/ContatoParanormal.png" alt="" />,
    "Mergulhar Mental": <img src="/symbols/MergulhoMental.png" alt="" />,
    Vidência: <img src="/symbols/Videncia.png" alt="" />,
    "Convocação Instantânea": (
      <img src="/symbols/ConvocacaoInstantanea.png" alt="" />
    ),
    "Salto Fantasma": <img src="/symbols/SaltoFantasma.png" alt="" />,
    "Transfigurar Água": <img src="/symbols/TransfigurarAgua.png" alt="" />,
    "Transfigurar Tera": <img src="/symbols/TransfigurarTerra.png" alt="" />,
    "Âncora Temporal": <img src="/symbols/AncoraTemporal.png" alt="" />,
    "Poeira da Podridão": <img src="/symbols/PoeiraDaPodridao.png" alt="" />,
    "Tentáculos de Lodo": <img src="/symbols/TentaculoDeLodo.png" alt="" />,
    "Zerar Entropia": <img src="/symbols/ZerarEntropia.png" alt="" />,
    "Ferver Sangue": <img src="/symbols/FerverSangue.png" alt="" />,
    "Forma Monstruosa": <img src="/symbols/FormaMonstruosa.png" alt="" />,
    "Controle Mental": <img src="/symbols/ControleMental.png" alt="" />,
    Inexistir: <img src="/symbols/Inexistir.png" alt="" />,
    Possessão: <img src="/symbols/Possessao.png" alt="" />,
    "Alterar Destino": <img src="/symbols/AlterarDestino.png" alt="" />,
    "Deflagração de Energia": (
      <img src="/symbols/DeflagracaoDeEnergia.png" alt="" />
    ),
    Teletransporte: <img src="/symbols/Teletransporte.png" alt="" />,
    "Convocar o Algoz": <img src="/symbols/ConvocarOAlgoz.png" alt="" />,
    "Fim Inevitável": <img src="/symbols/FimInevitavel.png" alt="" />,
    "Capturar o Coração": <img src="/symbols/CapturarOCoracao.png" alt="" />,
    "Invólucro de Carne": <img src="/symbols/InvolucroDeCarne.png" alt="" />,
    "Vínculo de Sangue": <img src="/symbols/VinculoDeSangue.png" alt="" />,
    "Canalizar o Medo": <img src="/symbols/CanalizarOMedo.png" alt="" />,
    "Conhecendo o Medo": <img src="/symbols/ConhecendoOMedo.png" alt="" />,
    "Lâmina do Medo": <img src="/symbols/LaminaDoMedo.png" alt="" />,
    "Medo Tángivel": <img src="/symbols/MedoTangivel.png" alt="" />,
    "Presença do Medo": <img src="/symbols/PresencaDoMedo.png" alt="" />,
  };

  function addDamageInput() {
    setDamages([...damages, ""]);
  }

  const handleChangedDamage = (e, index) => {
    setDamages(
      damages.map((damage, i) => {
        return i === index ? e.target.value : damage;
      })
    );
  };

  async function CreateRitual() {
    const damage = [...damages];
    const newRitual = { ...infoCreateRituals, damage };
    setInfoCreateRituals(newRitual);
    const newArray = [...getRituals.arrayRituals, newRitual];
    await db.collection("rituals").doc(record.value.uid).set(
      {
        arrayRituals: newArray,
      },
      { merge: true }
    );
    setIsModalCreateRitual(false);
    getDocAllRituals();
  }

  const handleClick = () => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 2000);
  };

  const RollDamage = (value) => {
    let sum = [];
    value.forEach((e) => {
      if (e.includes("d")) {
        const dado = parseInt(e.split("d")[1]);
        const roll = parseInt(e.split("d")[0]);
        sum.push(
          ...Array(roll)
            .fill(0)
            .map(() => Math.floor(Math.random() * dado + 1))
        );
      } else {
        const Int = parseInt(e);
        sum.push(Int);
      }
    });
    setResult({
      ...result,
      newValue: sum.reduce(
        (acctualValue, currentValue) => acctualValue + currentValue,
        0
      ),
      calc: value,
    });
  };

  return (
    <>
      {isModalCreateRitual ? (
        <ModalLarge
          onClose={(e) => {
            setIsModalCreateRitual(false);
            setDamages([]);
          }}
        >
          <div className="flex flex-col items-center justify-between w-full h-full">
            <div className="w-full border-b-[1px] border-white p-2 flex items-center justify-center text-xl font-bold">
              CRIAR RITUAL
            </div>
            <div className="w-[70%]">
              <p className="text-[0.8vw]">Ritual:</p>
              <select
                className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                onChange={(e) =>
                  setInfoCreateRituals({
                    ...infoCreateRituals,
                    name: e.target.value,
                  })
                }
              >
                {rituals.map((option) => (
                  <option
                    className="bg-black-100 text-white"
                    key={option.label}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[70%]">
              <p className="text-[0.8vw]">Elemento:</p>
              <select
                className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                onChange={(e) =>
                  setInfoCreateRituals({
                    ...infoCreateRituals,
                    element: e.target.value,
                  })
                }
              >
                {elementRituals.map((option) => (
                  <option
                    className="bg-black-100 text-white"
                    key={option.label}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[70%]">
              <p className="text-[0.8vw]">Alcance:</p>
              <select
                className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                onChange={(e) =>
                  setInfoCreateRituals({
                    ...infoCreateRituals,
                    reach: e.target.value,
                  })
                }
              >
                {search.map((option) => (
                  <option
                    className="bg-black-100 text-white"
                    key={option.label}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[70%]">
              <p className="text-[0.8vw]">Duração:</p>
              <select
                className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                onChange={(e) =>
                  setInfoCreateRituals({
                    ...infoCreateRituals,
                    duration: e.target.value,
                  })
                }
              >
                {scene.map((option) => (
                  <option
                    className="bg-black-100 text-white"
                    key={option.label}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[70%]">
              <p className="text-[0.8vw]">Nivel do Círculo:</p>
              <select
                className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                onChange={(e) =>
                  setInfoCreateRituals({
                    ...infoCreateRituals,
                    circle: e.target.value,
                  })
                }
              >
                {circle.map((option, index) => (
                  <option
                    className="bg-black-100 text-white"
                    key={index}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[70%]">
              <p className="text-[0.8vw]">Resistência:</p>
              <select
                className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                onChange={(e) =>
                  setInfoCreateRituals({
                    ...infoCreateRituals,
                    resistance: e.target.value,
                  })
                }
              >
                {resistance.map((option) => (
                  <option
                    className="bg-black-100 text-white"
                    key={option.label}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-[70%]">
              <p className="text-[0.8vw]">Alvo:</p>
              <div className="flex gap-[0.3vw]">
                <input
                  className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                  placeholder="Ex:podem ser seres (pessoas, animais e/ou criaturas)"
                  onChange={(e) =>
                    setInfoCreateRituals({
                      ...infoCreateRituals,
                      target: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="w-[70%]">
              <p className="text-[0.8vw]">Execução:</p>
              <div className="flex gap-[0.3vw]">
                <input
                  className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                  placeholder="Ex:podem ser seres (pessoas, animais e/ou criaturas)"
                  onChange={(e) =>
                    setInfoCreateRituals({
                      ...infoCreateRituals,
                      execution: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="w-[70%]">
              <p className="text-[0.8vw]">Descrição:</p>
              <div className="flex gap-[0.3vw]">
                <input
                  className="bg-transparent w-full border-b-[2px] border-gray-900 focus:outline-none"
                  placeholder="Ex:O alvo cai lentamente. A velocidade de..."
                  onChange={(e) =>
                    setInfoCreateRituals({
                      ...infoCreateRituals,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="w-[70%]">
              <p className="text-[0.8vw]">Dano</p>
              <div className="flex gap-[0.5vw]">
                {damages.map((damage, index) => {
                  return (
                    <div>
                      <input
                        key={index}
                        className="bg-transparent border-[2px] border-gray-900 w-[2.5vw] text-center text-[0.8vw]"
                        onChange={(e) => handleChangedDamage(e, index)}
                      />
                    </div>
                  );
                })}
                <button
                  className="bg-red-800 p-[0.1vw]"
                  onClick={(e) => addDamageInput()}
                >
                  <RiAddFill />
                </button>
              </div>
            </div>
            <button
              className="bg-red-1000 w-28 rounded-md mb-4"
              onClick={CreateRitual}
            >
              Criar
            </button>
          </div>
        </ModalLarge>
      ) : null}
      {isModalVisibleDamage ? (
        <ModalSmall
          onClose={(e) => {
            setIsModalVisibleDamage(false);
          }}
        >
          <div className="flex flex-col items-center justify-between w-full h-full">
            <div className="w-full border-b-[1px] border-white p-2 flex items-center justify-center text-xl font-bold">
              ROLAGEM DE DANO
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
              {!show && (
                <div className="h-[80%] flex items-center">
                  <div className="w-5 h-5 rounded-full bg-white animate-ping" />
                </div>
              )}
              {show && (
                <>
                  <div className="flex">
                    {result.calc.map((el, index) => {
                      return (
                        <p className="text-xl">
                          {el}
                          {index !== result.calc.length - 1 && "+"}
                        </p>
                      );
                    })}
                  </div>
                  <div className="text-4xl font-bold">{result.newValue}</div>
                </>
              )}
            </div>
          </div>
        </ModalSmall>
      ) : null}
      <div
        className="bg-black-opacity w-[99%] h-[638px] rounded-md flex flex-col items-center border-[1px] border-gray-800
        2xl:w-[79%] 2xl:h-[720px]
        "
      >
        <div className="w-[96%] flex items-center justify-between border-b-[1px] border-gray-800 pt-[15px] pb-[15px]">
          <div className="w-[67.52px]" />
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-2xl">RITUAIS</p>
          </div>
          <div className="flex items-center gap-[0.6vw]">
            <div
              title="Criar Ritual"
              className="border-[2px] border-gray-400 p-1 cursor-pointer"
              onClick={(e) => {
                setIsModalCreateRitual(true);
              }}
            >
              <RiAddFill />
            </div>
            <div
              title="Editar Ritual (Em Desenvolvimento)"
              className="border-[2px] border-gray-400 p-1 cursor-pointer"
              onClick={() => {
                //   setIsEditSkills(!isEditSkills);
              }}
            >
              {/* {isEditSkills ? <BsFillPencilFill /> : <AiFillEye />} */}
              <AiFillEye />
            </div>
          </div>
        </div>
        <div className="overflow-y-auto scrollbar w-full flex flex-wrap px-5 py-3 gap-5 items-center">
          {getRituals.length !== 0 &&
            getRituals.arrayRituals.map((ri, index) => {
              let color = "";
              if (ri.element === "Conhecimento") {
                color = "#c29a65";
              } else if (ri.element === "Energia") {
                color = "#6121A8";
              } else if (ri.element === "Morte") {
                color = "#302a2b";
              } else if (ri.element === "Sangue") {
                color = "#630f0c";
              }
              return (
                <div
                  className="border-[2px] border-[#35353b] w-full h-[230px] rounded-md"
                  key={index}
                >
                  <div className="w-full flex h-[63%] border-b-[2px] border-[#35353b]">
                    <div
                      className="w-[11%] flex items-center justify-center cursor-pointer"
                      onClick={() => {
                        RollDamage(ri.damage);
                        setIsModalVisibleDamage(true);
                        handleClick();
                      }}
                    >
                      {iconMap[ri.name]}
                    </div>
                    <div className="w-full flex items-center pl-4">
                      <div className="w-[50%] flex flex-col gap-2">
                        <p className="font-bold text-xl" style={{ color }}>
                          {ri.name}
                        </p>
                        <p className="text-lg">
                          <span className="font-bold">Elemento:</span>{" "}
                          {ri.element}
                        </p>
                        <p className="text-lg">
                          <span className="font-bold">Alcance:</span> {ri.reach}
                        </p>
                        <p className="text-lg">
                          <span className="font-bold">Duração:</span>{" "}
                          {ri.duration}
                        </p>
                      </div>
                      <div className="w-[50%] flex flex-col gap-2">
                        <p className="text-lg">
                          <span className="font-bold">Execução:</span>{" "}
                          {ri.execution}
                        </p>
                        <p className="text-lg">
                          <span className="font-bold">Alvo:</span> {ri.target}
                        </p>
                        <p className="text-lg">
                          <span className="font-bold">Resistência:</span>{" "}
                          {ri.resistance}
                        </p>
                        <p className="text-lg">
                          <span className="font-bold">Circulo:</span>{" "}
                          {ri.circle}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 flex leading-relaxed">
                    {ri.description}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default RitualsCard;
