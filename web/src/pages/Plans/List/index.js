import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { FiPlusCircle } from 'react-icons/fi';

import history from '~/services/history';

import { deletePlanRequest } from '~/store/modules/plan/delete/plan';
import { listPlanRequest } from '~/store/modules/plan/list/plan';

import Animation from '~/components/Animation';
import loadingAnimation from '~/assets/animations/loader.json';

import {
  Container,
  Content,
  TitleWrapper,
  EmptyContainer,
} from '~/styles/shared';
import { Table } from './styles';

function PlansList() {
  const dispatch = useDispatch();

  const { plans: currentPlans, loading, page, lastPage } = useSelector(
    state => state.planList
  );

  const plans = useMemo(() => currentPlans, [currentPlans]);
  const plansQty = useMemo(() => plans.length, [plans]);

  useEffect(() => {
    dispatch(listPlanRequest(1, ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(planId) {
    if (window.confirm('Você tem certeza que deseja apagar esse plano?')) {
      dispatch(deletePlanRequest(planId));

      const currentPlans = plans.filter(helpOrder => helpOrder.id !== planId);

      let newPage = currentPlans.length ? page : page - 1;
      if (newPage === 0) {
        newPage = 1;
      }
      const newList = {
        currentPlans,
        lastPage,
      };
      dispatch(listPlanRequest(newPage, newList));
    }
  }

  return (
    <Container>
      {loading ? (
        <Animation animation={loadingAnimation} />
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
                        <td>{plan.price}</td>
                        <td>
                          <div>
                            <button
                              type="button"
                              onClick={() =>
                                history.push(`/plans/${plan.id}/edit`)
                              }
                            >
                              editar
                            </button>
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
