describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('');
  });

  it('Insere uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de Engenharia de Software');
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show') 
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Edita uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Tarefa original{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .find('label')
      .should('have.text', 'Tarefa original');

    cy.get('[data-cy=todos-list] > li')
      .first()
      .find('label')
      .dblclick();

    cy.get('[data-cy=todos-list] > li.editing .edit')
      .should('be.visible')
      .clear()
      .type('Tarefa editada{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .find('label')
      .should('have.text', 'Tarefa editada');
  });

  it('Marca e desmarca uma tarefa como completa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Minha nova tarefa{enter}');

    cy.get('[data-cy=todos-list] > li').first().as('primeiraTarefa');

    cy.get('@primeiraTarefa')
      .find('[data-cy=toggle-todo-checkbox]')
      .click();

    cy.get('@primeiraTarefa')
      .should('have.class', 'completed');

    cy.get('@primeiraTarefa')
      .find('[data-cy=toggle-todo-checkbox]')
      .click();

    cy.get('@primeiraTarefa')
      .should('not.have.class', 'completed');
  });

  it('Limpa tarefas completadas', () => {
    cy.visit(''); 
    
    cy.get('[data-cy=todo-input]')
      .type('Tarefa Ativa 1{enter}')
      .type('Tarefa para Completar 1{enter}')
      .type('Tarefa para Completar 2{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 3);

    cy.get('[data-cy=todos-list] > li')
      .eq(1) 
      .find('[data-cy=toggle-todo-checkbox]')
      .click();

    cy.get('[data-cy=todos-list] > li')
      .eq(2) 
      .find('[data-cy=toggle-todo-checkbox]')
      .click();

    cy.get('[data-cy=todos-list] > li.completed').should('have.length', 2);
    cy.get('[data-cy=todos-list] > li:not(.completed)').should('have.length', 1);

    cy.get('.clear-completed')
      .should('be.visible') 
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('not.have.class', 'completed') 
      .find('label') 
      .should('have.text', 'Tarefa Ativa 1');
  });
});