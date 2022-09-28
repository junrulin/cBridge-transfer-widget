import axios from 'axios'
import { useWalletConnectionContext } from "../../providers/WalletConnectionContextProvider";

export const useSurvey = () => {
  const { walletAddress } = useWalletConnectionContext();
  
  async function survey(type, data) {
    const params = {
        type: type.toLowerCase(),
        data,
        walletAddress: walletAddress || '',
    }
    const f = new FormData();
    Object.entries(params).forEach(([key, value]) => {
      f.append(key, value)
    });
    axios.post('https://www.bobabrewery.com/boba/point', f);
  }
  return {
    survey
  }
}