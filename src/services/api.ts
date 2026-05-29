export interface ServerInfo {
  ip: string;
  port: number;
  players: number;
  maxPlayers: number;
  name: string;
}

// Пример функции для получения данных с API сервера (SAMP/MTA/GTA5)
export async function fetchServerStatus(ip: string): Promise<Partial<ServerInfo>> {
  try {
    // В реальности тут будет запрос к твоему API или мониторингу
    // const response = await fetch(`https://api.monitoring.ru/server/${ip}`);
    // return await response.json();
    
    // Имитация задержки сети
    await new Promise(r => setTimeout(r, 500));
    return {
      players: Math.floor(Math.random() * 1000),
      maxPlayers: 1000,
    };
  } catch (e) {
    console.error("Ошибка API:", e);
    return {};
  }
}
