import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';

function Deleta() {
  const { id } = useParams();
  const [redirectToSite, setRedirectToSite] = useState(false);
  const [loading, setLoading] = useState(true);  // Novo estado para carregar a exclusão

  useEffect(() => {
    // Função para deletar o torcedor
    const deletaTorcedor = async () => {
      try {
        await axios.delete(`https://projeto-de-web-2024.onrender.com/api/torcedores/${id}`);
        console.log("Deletado com sucesso");
        setRedirectToSite(true);  // Atualiza o estado para redirecionar
      } catch (error) {
        console.error("Erro ao deletar torcedor:", error);
      } finally {
        setLoading(false);  // Finaliza o carregamento
      }
    };

    deletaTorcedor();
  }, [id]);

  // Se o carregamento for finalizado e o redirecionamento estiver ativado, redireciona
  if (loading) {
    return <div>Deletando torcedor...</div>;  // Mostra uma mensagem de carregamento
  }

  if (redirectToSite) {
    return <Navigate to="/site" />;  // Redireciona para a página principal
  }

  return (
    <div>
      <h1>Deletando Torcedor com ID: {id}</h1>
    </div>
  );
}

export default Deleta;