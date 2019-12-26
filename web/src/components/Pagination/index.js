import React from 'react';
import PropTypes from 'prop-types';

import { PageActions } from './styles';

function Pagination({
  disableBack,
  disableNext,
  pageLabel,
  refresh,
  currentPage,
}) {
  function handleChange(action) {
    const pageNumber = action === 'back' ? currentPage - 1 : currentPage + 1;
    refresh(pageNumber);
  }

  return (
    <PageActions>
      <button
        type="button"
        disabled={disableBack}
        onClick={() => handleChange('back')}
      >
        Anterior
      </button>
      <span>Página {pageLabel}</span>
      <button
        type="button"
        disabled={disableNext}
        onClick={() => handleChange('next')}
      >
        Próximo
      </button>
    </PageActions>
  );
}

Pagination.propTypes = {
  disableBack: PropTypes.bool.isRequired,
  disableNext: PropTypes.bool.isRequired,
  pageLabel: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default Pagination;
