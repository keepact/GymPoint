import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiPlusCircle } from 'react-icons/fi';

import { formatPrice } from '~/utils';

import Animation from '~/components/Animation';
import loadingAnimation from '~/assets/animations/loader.json';

import api from '~/services/api';

import {
  Container,
  Content,
  TitleWrapper,
  EmptyContainer,
} from '~/styles/shared';
import { Table } from './styles';

function PlansList({ history }) {
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);

  async function loadPlans() {
    try {
      const response = await api.get('/plans');

      const data = response.data.map(r => ({
        ...r,
        priceFormatted: formatPrice(r.price),
        labelTitle: `${r.duration} ${r.duration >= 2 ? 'meses' : 'mês'}`,
      }));

      setPlans(data);
      setLoading(false);
    } catch (err) {
      toast.error('Houve um erro, tente novamente em alguns minutos');
    }
  }

  const plansQty = useMemo(() => plans.length, [plans]);

  useEffect(() => {
    loadPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(planId) {
    try {
      if (window.confirm('Você tem certeza que deseja apagar esse plano?')) {
        await api.delete(`plans/${planId}`);
        toast.error('Plano deletado com sucesso');
        loadPlans();
      }
    } catch (err) {
      toast.error('Houve um erro, tente novamente em alguns minutos');
    }
  }

  return (
    <Container>
      {loading ? (
        <Animation animation={loadingAnimation} loop height width />
      ) : (
        <>
          <TitleWrapper>
            <h1>Gereciando Planos</h1>
            <div>
              <button
                type="button"
                onClick={() => history.push('plans/create')}
              >
                <span>Cadastrar</span>
                <FiPlusCircle size={20} />
              </button>
            </div>
          </TitleWrapper>
          {plansQty > 0 ? (
            <>
              <Content>
                <Table>
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Duração</th>
                      <th>Valor p/ MÊS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.map(plan => (
                      <tr key={plan.id}>
                        <td>{plan.title}</td>
                        <td>{plan.labelTitle}</td>
                        <td>{plan.priceFormatted}</td>
                        <td>
                          <div>
                            <Link to={`/plans/${plan.id}`}>editar</Link>
                            <button
                              type="button"
                              onClick={() => handleDelete(plan.id)}
                            >
                              apagar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Content>
            </>
          ) : (
            <EmptyContainer>
              <h2>Não há planos cadastrados ainda.</h2>
            </EmptyContainer>
          )}
        </>
      )}
    </Container>
  );
}

PlansList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default PlansList;
