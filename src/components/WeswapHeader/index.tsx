import Account from '../Account';

import styles from './Header.module.scss';

import { useWeb3Context } from '../../providers/Web3ContextProvider';
import { useNonEVMContext } from '../../providers/NonEVMContextProvider';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setIsChainShow, setChainSource } from '../../redux/transferSlice';

import { getNetworkById } from '../../constants/network';

import HeaderCommon from './HeaderCommon';

export default function Header() {
  const dispatch = useAppDispatch();

  const { totalActionNum, totalPaddingNum, fromChain, tokenList } =
    useAppSelector((state) => state.transferInfo);

  const { network, signer, chainId } = useWeb3Context();
  const { nonEVMConnected } = useNonEVMContext();
  const showChain = (type) => {
    dispatch(setChainSource(type));
    dispatch(setIsChainShow(true));
  };
  const { isMobile } = useAppSelector((state) => state.windowWidth);

  const injected = isMobile ? (
    <Account></Account>
  ) : (
    <>
      <Account></Account>
      {(signer || nonEVMConnected) && (
        <div
          className="chainLocale"
          style={{
            backgroundImage:
              'linear-gradient(90deg,#774eff,#6c81ff)',
            color: '#ffffff',
          }}
          onClick={() => {
            showChain('wallet');
          }}
        >
          <img
            className={styles['history-icon']}
            style={{ marginRight: 0 }}
            alt={'chain name'}
            src={getNetworkById(fromChain?.id ?? chainId)?.iconUrl}
          />
          <div className="chinName">
            <span style={{ maxLines: 1, whiteSpace: 'nowrap' }}>
              {getNetworkById(fromChain?.id ?? chainId)?.name !== '--'
                ? getNetworkById(fromChain?.id ?? chainId)?.name
                : network}
            </span>
          </div>
        </div>
      )}
    </>
  );

  return (
    <HeaderCommon injected={injected} isMobile={isMobile} activeKey={'bridge'}></HeaderCommon>
  );
}
