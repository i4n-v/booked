import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { SolicitationCard } from "@/components/Cards";
import { Text } from "react-native-svg";
import { useSolicitation } from "@/services";
import { ListCounter } from "@/components";

export default function Solicitations() {
  const { getSolicitations } = useSolicitation();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchSolicitations = async () => {
      setLoading(true);
      try {
        const response = await getSolicitations({});
        setData(response.items);
        setTotalPages(response.totalPages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitations();
  }, []);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (error) {
    return <Text>Erro: {error}</Text>;
  }

  return (
    <>
      <ListCounter title="Solicitações" count={data.length} total={totalPages} />
      <SafeAreaView>
        <ScrollView>
          {data.map((item) => (
            <SolicitationCard
              key={item.id}
              id={item.id}
              status={item.status}
              book={item.book}
              user={item.user}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
