function makeRow(description, points) {
  return `
        <tr>
            <td>${description}</td>
            <td>${points}</td>
        </tr>
    `;
}

function btnRemoveEvent(event) {
  // Deleta o ponto extra em que o botão está
  const target = event.target;

  target.parentNode.remove();
}

function makeExtraPoint() {
  const inputContainer = document.createElement('div');
  inputContainer.classList.add('input-container');

  const inputDescription = document.createElement('input');
  inputDescription.setAttribute('type', 'text');
  inputDescription.setAttribute('placeholder', 'Descrição');

  const inputPoints = document.createElement('input');
  inputPoints.setAttribute('type', 'number');
  inputPoints.setAttribute('placeholder', 'Acréscimo/Decréscimo');

  const btnRemove = document.createElement('button');
  btnRemove.addEventListener('click', btnRemoveEvent);
  btnRemove.classList.add('button');
  btnRemove.setAttribute('type', 'button');
  btnRemove.textContent = 'Remover';

  inputContainer.appendChild(inputDescription);
  inputContainer.appendChild(inputPoints);
  inputContainer.appendChild(btnRemove);

  return inputContainer;
}

function main() {
  const form = document.forms['point-calculator'];

  const qtdConjuntos = form.elements.qtdConjuntos;
  const qtdKitsVeteranos = form.elements.qtdKitsVeteranos;

  const kitsExtras = document.getElementById('kitsExtras');

  const btnAddExtraPoints = document.getElementById('addExtraPoints');
  const extraPointsContainer = document.getElementById('extra-points');

  // Alterar a quantidade de kits extras sempre que o input de conjuntos mudar seu valor
  qtdConjuntos.addEventListener('input', function () {
    const kitsAtuais = Number(qtdConjuntos.value);
    const extras = kitsAtuais > 80 ? kitsAtuais - 80 : 0;

    kitsExtras.textContent = extras;
    qtdKitsVeteranos.setAttribute('max', extras);
  });

  btnAddExtraPoints.addEventListener('click', function () {
    const container = makeExtraPoint();
    extraPointsContainer.appendChild(container);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let relatorio = `
        <table class="small-table">
            <thead>
                <tr>
                    <th class="header">Descrição</th>
                    <th class="header">Pontos</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Pegando e transformando todos os valores do formulário
    const qtdConjuntos = Number(form.elements.qtdConjuntos.value);
    const qtdKits = Number(form.elements.qtdKits.value);
    const qtdSuplemento = Number(form.elements.qtdSuplemento.value);
    const qtdArroz5Kg = Number(form.elements.qtdArroz5Kg.value);
    const qtdArroz1Kg = Number(form.elements.qtdArroz1Kg.value);
    const qtdFeijao2kg = Number(form.elements.qtdFeijao2kg.value);
    const qtdFeijao1Kg = Number(form.elements.qtdFeijao1Kg.value);
    const qtdMacarrao = Number(form.elements.qtdMacarrao.value);
    const qtdOleo = Number(form.elements.qtdOleo.value);
    const qtdKitsVeteranos = Number(form.elements.qtdKitsVeteranos.value);
    const qtdDoacoesSangue = Number(form.elements.qtdDoacoesSangue.value);
    const chkAcaoSocial = form.elements.chkAcaoSocial.checked;
    const apresentacaoCriatividade = Number(
      form.elements.apresentacaoCriatividade.value
    );
    const apresentacaoPerformance = Number(
      form.elements.apresentacaoPerformance.value
    );
    const apresentacaoContextualizacao = Number(
      form.elements.apresentacaoContextualizacao.value
    );
    const chkExcedeuApresentacao = form.elements.chkExcedeuApresentacao.checked;
    const mascoteOriginalidade = Number(
      form.elements.mascoteOriginalidade.value
    );
    const mascoteCaracterizacao = Number(
      form.elements.mascoteCaracterizacao.value
    );
    const mascoteAtuacao = Number(form.elements.mascoteAtuacao.value);
    const qtdAcertosQuiz = Number(form.elements.qtdAcertosQuiz.value);
    const chkHouveAnimacao = form.elements.chkHouveAnimacao.checked;

    // Calculando os pontos
    let totalPoints = 0;

    if (qtdConjuntos >= 80) {
      totalPoints += 5000;
      relatorio += makeRow('80 ou mais kits', 5000);

      // 50 pontos por conjunto acima da meta
      const extras = qtdConjuntos - 80;
      totalPoints += extras * 50;
      relatorio += makeRow(`${extras} kits acima da meta`, extras * 50);
    } else if (qtdConjuntos >= 64) {
      totalPoints += 4000;
      relatorio += makeRow('64 ou mais kits', 4000);
    } else if (qtdConjuntos >= 40) {
      totalPoints += 2500;
      relatorio += makeRow('40 ou mais kits', 2500);
    } else if (qtdConjuntos >= 16) {
      totalPoints += 1000;
      relatorio += makeRow('16 ou mais kits', 1000);
    } else {
      relatorio += makeRow('Menos que 16 kits', 0);
    }

    // Avulsos
    totalPoints += qtdKits * 25;
    relatorio += makeRow('Kits avulsos', qtdKits * 25);

    totalPoints += qtdSuplemento * 10;
    relatorio += makeRow('Suplementos avulsos', qtdSuplemento * 10);

    totalPoints += qtdArroz5Kg * 5;
    relatorio += makeRow('Pacotes de arroz (5Kg)', qtdArroz5Kg * 5);

    totalPoints += qtdArroz1Kg;
    relatorio += makeRow('Pacotes de arroz (1Kg)', qtdArroz1Kg);

    totalPoints += qtdFeijao2kg * 2;
    relatorio += makeRow('Pacotes de feijão (2Kg)', qtdFeijao2kg * 2);

    totalPoints += qtdFeijao1Kg;
    relatorio += makeRow('Pacotes de feijão (1Kg)', qtdFeijao1Kg);

    totalPoints += qtdMacarrao * 0.5;
    relatorio += makeRow('Pacotes de macarrão', qtdMacarrao * 0.5);

    totalPoints += qtdOleo;
    relatorio += makeRow('Litros de óleo', qtdOleo);

    // Doações Extras de Veteranos
    totalPoints += qtdKitsVeteranos * 50;
    relatorio += makeRow('Doações extras de veteranos', qtdKitsVeteranos * 50);

    // Doações de Sangue
    totalPoints += qtdDoacoesSangue * 15;
    relatorio += makeRow('Doações de sangue', qtdDoacoesSangue * 15);

    // Ação Social
    if (chkAcaoSocial) {
      totalPoints += 2000;
      relatorio += makeRow('Ação Social', 2000);
    }

    // Apresentação Musical/Cultural
    totalPoints +=
      apresentacaoCriatividade +
      apresentacaoPerformance +
      apresentacaoContextualizacao;

    relatorio += makeRow(
      'Apresentação - Criatividade',
      apresentacaoCriatividade
    );
    relatorio += makeRow('Apresentação - Performance', apresentacaoPerformance);
    relatorio += makeRow(
      'Apresentação - Contextualização',
      apresentacaoContextualizacao
    );

    if (chkExcedeuApresentacao) {
      totalPoints -= 200;
      relatorio += makeRow('Excedeu os 4 minutos da apresentação', -200);
    }

    // Mascote da Equipe
    totalPoints +=
      mascoteAtuacao + mascoteCaracterizacao + mascoteOriginalidade;

    relatorio += makeRow('Mascote - Atuação', mascoteAtuacao);
    relatorio += makeRow('Mascote - Caracterização', mascoteCaracterizacao);
    relatorio += makeRow('Mascote - Originalidade', mascoteOriginalidade);

    // Quiz
    totalPoints += qtdAcertosQuiz * 200;
    relatorio += makeRow(
      `Acertos no Quiz (${qtdAcertosQuiz})`,
      qtdAcertosQuiz * 200
    );

    // Animação e Caracterização
    if (chkHouveAnimacao) {
      totalPoints += 1000;
      relatorio += makeRow('Animação e Caracterização da Equipe', 1000);
    }

    const extraPoints =
      extraPointsContainer.querySelectorAll('.input-container');
    extraPoints.forEach((node) => {
      const inputDescription = node.querySelector('[type="text"]');
      const inputPoints = node.querySelector('[type="number"]');

      const description = inputDescription.value;
      const points = Number(inputPoints.value);

      if (!description || !points) return;

      totalPoints += points;
      relatorio += makeRow(description, points);
    });

    relatorio += `
            </tbody>
            <tfoot>
                <tr>
                    <th class="header">Total</th>
                    <th class="header">${totalPoints} pontos</th>
                </tr>
            </tfoot>
        </table>
    `;

    document.getElementById('result').innerHTML = relatorio;
  });
}

window.addEventListener('load', main);
