// pages/home.js o pages/index.js
import React from 'react';
import { Layout } from '../../layouts/DefaultLayout';
import Link from "next/link";
import { Markdown } from "~/components/ui/Markdown"; 

const faq = () => {
  return (
    <>
      <Layout>
        <div className='w-full flex flex-col gap-12'>
            <div className='w-full flex flex-col gap-8 py-2 text-black text-xl'>
                <h1 className='text-center font-bold text-6xl font-ojuju'>FAQs</h1>
                <p className='text-justify'>Si eres parte de una comunidad o proyecto mexicano esto puede interesarte. Te presentamos <strong>Ethereum México PGF</strong>, una ronda de financiamiento para los comunidades web3 de México.</p>
                <p className='text-justify'>El objetivo de nuestra ronda es explorar nuevos mecanismos y herramientas en el espacio de financiación de <strong>public goods</strong>, apoyar a los proyectos y comunidades participantes en la creación de un historial on chain de sus contribuciones al ecosistema.</p>
                <div className='flex '>
                    <div className='flex flex-col gap-5 mx-auto'>
                        {/*
                        <p>¿Cómo obtener la data de pruebas on chain?</p>
                        <p>Timeline de la ronda</p>
                        */}
                        <a href="#aplicar" className='hover:underline'>¿Cómo aplicar?</a>
                        <a href="#votar" className='hover:underline'>¿Cómo votar?</a>
                        <a href="#evaluar" className='hover:underline'>¿Cómo se evaluará la ronda?</a>
                        <a href="#distribuir" className='hover:underline'>¿Cómo se distribuirán los fondos?</a>
                        <a href="#dudas" className='hover:underline'>¿En donde puedes resolver dudas?</a>
                        
                    </div>
                    <div className='flex flex-col gap-5 mx-auto'>
                        <a href="#public" className='hover:underline'>¿Qué es un Bien Público?</a>
                        <a href="#tipos_public" className='hover:underline'>Tipos de Bienes Públicos elegibles para participar</a>
                        <a href="#impacto" className='hover:underline'>Tipos de Impacto</a>
                        <a href="#tecnologias" className='hover:underline'>¿Qué conjunto de tecnologías se utilizarán en la ronda?</a>
                    </div>
                </div>
                
                {/*
                <div className='flex flex-col gap-8'>
                    <h2 className='font-bold text-4xl font-ojuju'>¿Cómo obtener la data de pruebras on chain?</h2>
                    <p className='font-semibold'>¿Cómo compartir la data del POAP</p>
                    <a className='underline' href="https://collectors.poap.xyz/gallery">1. Busca el POAP</a>
                    <img src="/images/poap-1.png" alt="search example" className='w-96'/>
                    <p>2. Selecciona el POAP creado por tu comunidad</p>
                    <img src="/images/poap-2.png" alt="search example" className='w-96'/>
                    <p>3. Da click en “Download CSV”</p>
                    <p>4. Comparte con nosotros y repite el proceso para cada una de los POAPs que hayas creado durante tus eventos o dinámicas.</p>

                    <p className='font-semibold'>¿Cómo obtener la data de si creaste un evento con Unlock Protocol?</p>
                    <p>1. Inicia sesión con tu wallet</p>
                    <p>2. Selecciona el evento</p>
                    <img src="/images/up-example.png" alt="search example" style={{width: "624px"}}/>
                    <p>3. Da click en “Download attendee list”</p>
                    <img src="/images/up-example-2.png" alt="search example" style={{width: "624px"}}/>
                    <p>4. Comparte con nosotros y repite el proceso para cada uno de los Eventos que hayas creado con Unlock Protocol.</p>
                </div>

                
                <div className='flex flex-col gap-8'>
                    <h2 className='font-bold text-4xl font-ojuju'>Timeline de la ronda</h2>
                </div>
                */}

                <div className='flex flex-col gap-8 py-2' id='aplicar'>
                    <Markdown>{`### ¿Cómo Aplicar?`}</Markdown>
                    <li className='flex flex-col pl-4'>
                        <p>1. Conecta tu wallet al sitio</p>
                        <p>2. Dirigete a la página de <b> Proyectos </b> y selecciona <b> Crear Aplicación </b></p>
                        <p>3. Llena todos los campos</p>
                        <p>4. Al finalizar, selecciona <b> Enviar aplicación </b> y ¡Listo! tu aplicación habrá sido creada y enviada 🤓</p>
                    </li>
                    {/**
                    <img src="/images/apply-example-1.png" alt="search example" style={{width: "624px"}}/>
                    
                    <img src="/images/apply-example-2.png" alt="search example" style={{width: "624px"}}/>
                    */}
                    <li className='flex flex-col pl-4'>
                        <p>Consulta <i><a className='hover:underline underline' href="https://docs.google.com/document/d/1WhKP4jPSvNQctzjkv-BZ4mJ8dNALEPi-4a9sd5p6V_M/edit?usp=sharing">aquí</a></i> las preguntas de la aplicación</p>
                        <p>Consulta <i><a className='hover:underline underline' href="https://www.youtube.com/watch?v=DTp4V28lYlI&t=7s">aquí</a></i> la sesión del paso a paso de ¿Cómo aplicar a Ethereum México PGF? 🚀</p>
                    </li>
                    
                </div>
                
                {/* ------------------- Pendiente como votar-------------------- */}
                <div className='flex flex-col gap-8'  id='votar'>
                    <Markdown>{`### ¿Cómo Votar?`}</Markdown>
                    <p>Consulta <i><a className='hover:underline underline' href="https://www.loom.com/share/04313481ce184d6d98a54c91deff40c3?sid=b9a2fbc0-2a56-4e8a-a84a-200c8158b363">aquí</a></i> la sesión del paso a paso de  ¿Cómo votar? </p>
                </div>

                <div className='flex flex-col gap-8' id='dudas'>
                    <Markdown>{`### ¿En donde puedes resolver dudas?`}</Markdown>
                    <p>Conoce más detalles de este proyecto:</p>
                    <li className='flex flex-col pl-4'>
                        <p>
                            <b> Workshop Ethereum México PGF: Sesión de Onboarding y Preguntas </b>
                            <br />
                            Miércoles 24 de julio a las 5 pm (Hora Centro)
                            <br/><a href="https://lu.ma/uxq52t2w" className='hover:underline underline'>Regístrate a la sesión aquí</a>
                        </p>
                        <br/>
                        <p> 
                            <b> Workshop Ethereum México PGF: ¿Cómo Votar</b>
                            <br />
                            Miércoles 14 de agosto a las 5 pm (Hora Centro)
                            <br />
                            Miércoles 21 de agosto a las 5 pm (Hora Centro)
                        </p>
                    </li>
                    <p>También puedes contactárnos a través de nuestros canales de Telegram:</p>
                    <li className='flex flex-col pl-4'>
                        <p>
                        <a href='https://t.me/+LfuUKGMCjGgyYjJh' className='hover:underline underline'>Link</a> para dudas de comunidades aplicantes
                        </p>
                        <p>
                        <a href='https://t.me/ethmexico' className='hover:underline underline'>Link</a> para dudas de votantes de la ronda
                        </p>
                    </li>
                    
                </div>

                <div className='flex flex-col gap-8' id='tecnologias'>
                    <Markdown>{`### ¿Qué conjunto de tecnologías se utilizarán en la ronda?`}</Markdown>
                    <a className='underline font-bold' href='https://maci.pse.dev'>MACI - Minimal Anti-Collusion Infrastructure</a>
                    <p>La infraestructura mínima anticolusión (MACI) es un sistema de votación en cadena con una resistencia mucho mayor a una colisión. A través del uso de Smart Contracts en Ethereum y pruebas Zero-Knowledge Proofs.</p>
                    <a className='underline font-bold' href='https://github.com/gitcoinco/easy-retro-pgf/'>EasyRetroPGF</a>
                    <p>Framework para ejecutar una ronda RPGF en Optimisim.</p>
                    <a className='underline font-bold' href='https://hypercerts.org'>Hypercerts</a>
                    <p>Protocolo de código abierto para financiar y recompensar proyectos de impacto positivo.</p>
                    <a className='underline font-bold' href='https://docs.attest.org/docs/welcome'>EAS</a>
                    <p>Ethereum Attestation Service (EAS) es un public good de infraestructura para realizar certificaciones dentro o fuera de la cadena.</p>
                </div>

                <div className='flex flex-col gap-8' id='public'>
                    <Markdown>{`### ¿Qué es un Bien Público?`}</Markdown>
                    <p>En filosofía, economía y ciencias políticas, el bien común es aquello que es compartido y beneficioso para todos o la mayoría de los miembros de una comunidad determinada o, alternativamente, lo que se consigue mediante la ciudadanía, la acción colectiva y la participación activa en el ámbito de la política y el servicio público.</p>
                    <p>En economía, específicamente, un bien público es un bien no excluible y no competitivo. El uso por parte de una persona no impide el acceso a otras personas ni reduce su disponibilidad. Por lo tanto, el bien puede ser utilizado simultáneamente por más de una persona. Un bien público debe ser valioso para más de un usuario, de lo contrario, su disponibilidad simultánea para más de una persona sería económicamente irrelevante.</p>
                    <p>Ejemplos de bienes públicos pueden incluir, pero no se limitan a:</p>
                    <li className='flex flex-col pl-4'>
                        <ul>· Conocimiento</ul>
                        <ul>· Seguridad nacional</ul>
                        <ul>· Alumbrado público</ul>
                        <ul>· Aire</ul>
                        <ul>· Medios de comunicación gratuitos</ul>
                        <ul>· Estadísticas oficiales</ul>
                        <ul>· Carreteras gratuitas</ul>
                    </li>
                </div>

                <div className='flex flex-col gap-8'>
                    <Markdown>{`### Tipos de Bienes Públicos elegibles para participar`}</Markdown>
                    <p>En esta ronda nos interesa financiar los siguientes bienes públicos:</p>
                    <p className='pl-4 font-bold'>· Reducción de la brecha de género</p>
                    <p>Proyectos que se enfoquen en fomentar la participación de personas de géneros con poca o nula representación permiten que la Web3 se construya con una gran variedad de valores y perfiles que puedan aportar ideas que beneficien a la sociedad de forma equitativa.</p>
                    <p className='pl-4 font-bold'>· Incorporación de nuevos usuarios</p>
                    <p>Proyectos que se enfoquen en atraer y educar a nuevos usuarios sobre las tecnologías de Web3 son esenciales para el crecimiento y la adopción masiva del ecosistema. Estas iniciativas deben proporcionar recursos y apoyo para que los principiantes puedan entender y utilizar las herramientas de Web3 de manera efectiva, fomentando una comunidad inclusiva y diversa que refleje una amplia gama de perspectivas y habilidades.</p>
                    <p className='pl-4 font-bold'>· Comunidades locales</p>
                    <p>Una comunidad local es de suma importancia para expandir la conversación acerca de Web3 y generar mayor consciencia en una ciudad. Fomentar el desarrollo de este tipo de comunidades es vital para poder traer más builders al ecosistema.</p>
                    <p className='pl-4 font-bold'>· ReFi</p>
                    <p>Las finanzas regenerativas o ReFi crean conciencia sobre sistemas financieros que vienen operando cada vez más de forma extractiva y explotadora. Las ReFi se presentan como una alternativa cultural para la financiación de la comunidad y el bien público; se presentan como una solución para la reconstrucción de nuestro sistema.</p>
                </div>

                <div className='flex flex-col gap-8'>
                    <Markdown>{`### Tipos de Impacto`}</Markdown>
                    <p>Nos interesa que los proyectos y comunidades se vuelvan más consientes del impacto que están generando, hemos dividido en 2 categorías el impacto que puede ser creado:</p>
                    <p className='font-bold'>Impacto Directo </p>
                    <li className='flex flex-col pl-4'>
                        <ul>· Aumento en la diversidad de desarrolladores y participantes en el ecosistema</ul>
                        <ul>· Mayor participación de mujeres y personas no binarias en la gobernanza de DAOs</ul>
                        <ul>· Incremento en la adopción y uso de  DApps</ul>
                        <ul>· Creación de comunidades relacionadas a Ethereum</ul>
                        <ul>· Financiación y desarrollo de proyectos abiertos y descentralizados en Ethereum</ul>
                    </li>
                    <p className='font-bold'>Impacto Indirecto</p>
                    <li className='flex flex-col pl-4'>
                        <ul>· Onboarding a Web3</ul>
                        <ul>· Onboarding a rondas de financiamiento en Ethereum</ul>
                        <ul>· Mejorar la percepción pública de Ethereum</ul>
                        <ul>· Iniciativas de impacto social que benefician la percepción pública de la red</ul>
                        <ul>· Influencia en la política y regulación al demostrar el potencial de las soluciones basadas en Ethereum</ul>
                    </li>
                    <p className='underline'>Nota: Para fines de esta ronda, ningún tipo de impacto es más importante que otro. Los puntos mencionados pueden o no estar en el tipo de impacto adecuado.</p>
                </div>

                <div className='flex flex-col gap-8'>
                    <h2 className='font-bold text-4xl font-ojuju'>¿Cómo se distribuirán los fondos?</h2>
                    <p>En esta ronda utilizaremos Voto Cuadrático o Quadratic Voting (QV) como mecanismo de distribución de fondos.</p>
                    <p>El voto cuadrático permite a los votantes asignar votos a opciones o candidatos en función su preferencia, utilizando un presupuesto fijo de créditos de voto o puntos. El costo de emitir votos aumenta cuadráticamente, lo que significa que cada voto adicional sobre una misma opción cuesta más que el anterior. Este sistema pretende equilibrar la intensidad de las preferencias, permitiendo una expresión más matizada de los deseos de los votantes. En esta ronda cada votante contará con 100 créditos o puntos a distribuir.</p>
                    <p>Si un votante decide asignar una gran cantidad de puntos a un solo proyecto, la siguiente tabla le ayudará a evaluar el impacto de su participación:</p>
                    <img src="/images/funds-distribution.png" alt="funds distribution" />
                    <a href="https://blog.tally.xyz/a-simple-guide-to-quadratic-voting-327b52addde1" className='underline'>Más información sobre el Quadratic Voting aquí</a>
                </div>

                <div className='flex flex-col gap-8'>
                    <h2 className='font-bold text-4xl font-ojuju'>¿Cómo se evaluará la ronda?</h2>
                    <p>La evaluación se llevará a cabo en 2 etapas, cada una pensada con un objetivo particular que permita facilitar el proceso de selección de proyectos participantes.</p>
                    <p className='font-bold'>Etapa 1: Filtrado preliminar</p>
                    <p>Se eliminarán de forma automática aquellos proyectos que cumplan uno o más de los siguientes aspectos:</p>
                    <li className='flex flex-col pl-4'>
                        <ul>· Proyectos ajenos a México sin impacto directo en México (ej. Modularcrypto (Brazil), ETHChile, Cryptoplaza (España), etc.)</ul>
                        <ul>· Proyectos que consideremos no pertenecen a las categorías seleccionadas</ul>
                        <ul>· ej. Kairos Research aplica a categoría “Disminución de la brecha de género”</ul>
                        <ul>· Proyectos que no sean Public Goods o sean considerados spam. Ver ¿Qué es un Bien Público?</ul>
                        <ul>· Proyectos financiados por capital privado</ul>
                        <ul>· Creados hace 3 meses o menos</ul>
                        <ul>· Sin historial público</ul>
                        <ul>· Proyectos NSFW que promuevan discursos de odio, racismo, xenofobia, clasismo o cualquier forma de discriminación.</ul>
                    </li>
                    <p className='font-bold'>Etapa 2: Selección final</p>
                    <p>Para la etapa de selección final, evaluaremos cada uno de los proyectos finalistas según la siguiente rúbrica. Esto nos permitirá ser imparciales y considerar diversos aspectos que pueden o no ser abordados por los aplicantes.</p>
                </div>








Etapa 2: Selección final
Para la etapa de selección final, evaluaremos cada uno de los proyectos finalistas según la siguiente rúbrica. Esto nos permitirá ser imparciales y considerar diversos aspectos que pueden o no ser abordados por los aplicantes.



            </div>
        </div>
      </Layout>
    </>
  );
};

export default faq;
