import fs from "node:fs";
import path from "node:path";
import { parseArticleHtml } from "./diariolibre";

describe("diario libre parser", () => {
  describe("when visiting an article html", () => {
    it("should parse the article", () => {
      const html = fs.readFileSync(
        path.join(__dirname, "../test", "fixtures", "diariolibre-article.html"),
        "utf8"
      );

      const article = parseArticleHtml(html);

      expect(article).toEqual({
        title:
          "Aumentan 19 % al salario mínimo de empresas privadas no sectorizadas",
        author: "Wilder Paez",
        url: "https://www.diariolibre.com/economia/empleo/2023/03/09/aumentan-salario-minimo-del-sector-privado-no-sectorizado/2249265",
        publication_date: "2023-03-09T00:01:00.000Z",
        tags: ["economia", "empleo"],
        content:
          "El presidente de la República, Luis Abinader, encabezó ayer la rueda de prensa del Comité Nacional de Salarios (CNS) en la que se anunció un aumento de un 19 % al salario mínimo para los empleados privados no sectorizados. El aumento será dividido en dos etapas: un 15 % será efectivo a partir de abril próximo y un 4 % en febrero del 2024. “Hoy triunfa de nuevo el diálogo tripartito (gobierno, empresarios, sector sindical) por la demostración del compromiso social con un verdadero desarrollo económico y social de la República Dominicana”, expresó Abinader. Resaltó la labor del Ministerio de Trabajo como árbitro en este proceso y recordó que el aumento salarial es uno de los objetivos de su gobierno. Dijo que este aumento llega en un momento económico difícil a nivel internacional, por la pandemia y la guerra. Abinader manifestó que este aumento busca que la capacidad de compra de los trabajadores no se vea deteriorada. Asimismo, espera que el salario sectorizado pueda ser impactado positivamente. Escala salarial De su lado, el ministro de Trabajo, Luis Miguel De Camps, aseguró que antes de que se produjera este consenso y de la resolución que eleva los salarios, el sueldo mínimo más alto no sectorizado cubría el 77% de la canasta básica familiar del primer quintil. “A partir de esta resolución tripartita, este salario va a cubrir el 93% de la canasta básica familiar del primer quintil”, dijo. También informó que, el salario de la pequeña empresa aumenta de 47% a 57% su cobertura. “Cuando aumenta el salario mínimo, quienes están por encima de ese salario, por lo general, también aumentan vía un efecto de consecuencia, de cadena”, expresó De Camps. Satisfechos En tanto que Rafael -Pepe- Abreu, presidente de la Confederación Nacional de Unidad Sindical (CNUS), indicó que la unión de empresarios, gobierno y sector sindical ha dado buenos resultados en el sector salarial. Los representantes de las centrales sindicales presentaron una propuesta en torno al 35 %. “Ahora vamos a trabajar en el sector turístico, zona franca y otros sectores, que serán convocados más adelante, para lograr el bienestar social en la República Dominicana”, afirmó el presidente de la Confederación de Trabajadores (CNTD), Jacobo Ramos. Gabriel del Río, presidente de la Confederación Autónoma Sindical Clasistas (CASC), abogó por que no se olviden a los empleados públicos y pensionados Mientras, Celso Juan Marranzini, presidente del Consejo de la Empresa Privada (Conep) y representante del sector empleador, alabó el gran entendimiento al que se llegó. Estos serán los nuevos salarios Empresa grande: El salario mínimo pasará de RD$21,000 a RD$24,990.00 en febrero del 2024, para un aumento total de RD$3,990. En abril se hará el primer aumento de un 15 % correspondiente a RD$3,150 y el 4 % restante en febrero de 2024 equivalente a los RD$840, para un nuevo salario mínimo de RD$24,990. Empresa mediana: El sueldo pasará RD$19,250 a RD$22,907.50 en febrero de 2024, para un aumento de RD$3,657.50. Empresa pequeña: El salario pasará RD$12,900 a RD$ a RD$15,351 en febrero del 2024, para un aumento de RD$2,451. Microempresas: El salario pasará RD$11,900 a RD$14,161 en febrero del 2024, para un aumento de RD$2,261.",
      });
    });
  });
});
