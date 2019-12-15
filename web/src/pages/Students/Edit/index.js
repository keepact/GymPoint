import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '~/services/api';

import {
  Content,
  ContainerForm,
  MyForm,
  NumberInputs,
  TitleWrapper,
} from '~/components/Container';

function Edit({ match }) {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState('');

  async function loadData() {
    const response = await api.get(`/students/${match.params.id}`);

    setStudent(response.data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContainerForm>
      <TitleWrapper>
        <h1>Edição de aluno</h1>
        <div>
          <Link to="/">Voltar</Link>
          <button type="button">Salvar</button>
        </div>
      </TitleWrapper>
      <Content>
        <MyForm>
          <>
            <label htmlFor="">Nome Completo</label>
            <input type="text" placeholder={student.name} />
            <label htmlFor="">Endereço de Email</label>
            <input type="text" placeholder={student.email} />

            <NumberInputs>
              <div>
                <label htmlFor="">Idade</label>
                <input type="number" placeholder={student.age} />
              </div>
              <div>
                <label htmlFor="">
                  Peso <span>(em kg)</span>
                </label>
                <input type="number" placeholder={student.weight} />
              </div>
              <div>
                <label htmlFor="">Altura</label>
                <input type="number" placeholder={student.height} />
              </div>
            </NumberInputs>
          </>
        </MyForm>
      </Content>
    </ContainerForm>
  );
}

Edit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Edit;
