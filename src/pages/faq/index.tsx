// pages/home.js o pages/index.js
import React from 'react';
import { Layout } from '../../layouts/DefaultLayout';
import Link from "next/link";

const faq = () => {
  return (
    <>
      <Layout>
        <div className='w-full flex flex-col gap-12'>
            <div className='w-full flex flex-col gap-8 py-2 text-black text-xl'>
                <h1 className='text-center font-bold text-6xl font-ojuju'>FAQs</h1>
                <p>Si eres parte de una comunidad o proyecto mexicano esto puede interesarte. Te presentamos <strong>Ethereum México PGF</strong>, una ronda de financiamiento para los comunidades web3 de México.</p>
                <p>El objetivo de nuestra ronda es explorar nuevos mecanismos y herramientas en el espacio de financiación de <strong>public goods</strong>, apoyar a los proyectos y comunidades participantes en la creación de un historial on chain de sus contribuciones al ecosistema.</p>
                <div className='flex underline'>
                    <div className='flex flex-col gap-2'>
                        <p>¿Cómo obtener la data de pruebas on chain?</p>
                        <p>Timeline de la ronda</p>
                        <p>¿Cómo aplicar?</p>
                        <p>¿Cómo votar?</p>
                        <p>¿En donde puedes resolver tus dudas?</p>
                        <p>¿Qué conjunto de tecnologías se utilizarán en la ronda?</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p>¿Qué es un Bien Público?</p>
                        <p>Tipos de Bienes Públicos elegibles para participar</p>
                        <p>Tipos de Impacto</p>
                        <p>¿Cómo se distribuirán los fondos?</p>
                        <p>¿Cómo se evaluará la ronda?</p>
                    </div>
                </div>
                
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

                {/* ------------------- Pendiente timeline-------------------- */}
                <div className='flex flex-col gap-8'>
                    <h2 className='font-bold text-4xl font-ojuju'>Timeline de la ronda</h2>
                </div>

                <div className='flex flex-col gap-8'>
                    <h2 className='font-bold text-4xl font-ojuju'>¿Cómo aplicar?</h2>
                    <p>1. Conectar billetera</p>
                    <img src="/images/apply-example-1.png" alt="search example" style={{width: "624px"}}/>
                    <p>2. Ir a proyectos y seleccionar Nueva Aplicación</p>
                    <img src="/images/apply-example-2.png" alt="search example" style={{width: "624px"}}/>
                    <p>3. Llena los campos</p>
                    <p>4. Selecciona “Crear aplicación” ¡Listo! tu aplicación ha sido creada y enviada Video tutorial</p>
                </div>
                
                {/* ------------------- Pendiente como votar-------------------- */}
                <div className='flex flex-col gap-8'>
                    <h2 className='font-bold text-4xl font-ojuju'>¿Cómo votar?</h2>
                </div>
                
                <div className='flex flex-col gap-8'>
                    <h2 className='font-bold text-4xl font-ojuju'>¿En donde puedes resolver tus dudas?</h2>
                    <p>Conoce más detalles de este proyecto:</p>
                    <li className='flex flex-col pl-4'>
                        <p>· Workshop: Jueves 23 de mayo a las 5 pm (Hora Centro):</p>
                        <a href="https://x.com/ethereum_mexico/status/1791559040507482325">· https://x.com/ethereum_mexico/status/1791559040507482325</a>
                        <a href="https://lu.ma/3969soai">· https://lu.ma/3969soai</a>
                        <p>· Sesión de Preguntas Frecuentes: Jueves 30 de mayo a las 5 pm (Hora Centro)</p>
                    </li>
                    <p>También puedes contactárnos a través de nuestros canales de Telegram:</p>
                    <a href='https://t.me/+LfuUKGMCjGgyYjJh'>Dudas comunidades aplicantes: https://t.me/+LfuUKGMCjGgyYjJh</a> 
                    <a href="https://t.me/ethmexico">Dudas Votantes de la ronda: https://t.me/ethmexico</a>
                </div>

                <div className='flex flex-col gap-8'>
                    <h2 className='font-bold text-4xl font-ojuju'>¿Qué conjunto de tecnologías se utilizarán en la ronda?</h2>
                    <a className='underline font-bold' href='https://maci.pse.dev'>MACI - Minimal Anti-Collusion Infrastructure</a>
                    <p>La infraestructura mínima anticolusión (MACI) es un sistema de votación en cadena con una resistencia mucho mayor a una colisión. A través del uso de Smart Contracts en Ethereum y pruebas Zero-Knowledge Proofs.</p>
                    <a className='underline font-bold' href='https://github.com/gitcoinco/easy-retro-pgf/'>EasyRetroPGF</a>
                    <p>Framework para ejecutar una ronda RPGF en Optimisim.</p>
                    <a className='underline font-bold' href='https://hypercerts.org'>Hypercerts</a>
                    <p>Protocolo de código abierto para financiar y recompensar proyectos de impacto positivo.</p>
                    <a className='underline font-bold' href='https://docs.attest.org/docs/welcome'>EAS</a>
                    <p>Ethereum Attestation Service (EAS) es un public good de infraestructura para realizar certificaciones dentro o fuera de la cadena.</p>
                </div>

                <div className='flex flex-col gap-8'>
                    <h2 className='font-bold text-4xl font-ojuju'>¿Qué es un Bien Público?</h2>
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
                    <h2 className='font-bold text-4xl font-ojuju'>Tipos de Bienes Públicos elegibles para participar</h2>
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
                    <h2 className='font-bold text-4xl font-ojuju'>Tipos de Impacto</h2>
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
