import { JsonRpcSigner, ZeroAddress } from "ethers"
import { MACI__factory as MaciFactory, InitialVoiceCreditProxy__factory as VoiceCreditProxyFactory } from "maci-cli/sdk"

/**
 * Get the voice credits from the constant voice credit proxy
 * @param signer - The signer to use to get the voice credits
 * @returns The voice credits
 */
export const getVoiceCredits = async (signer: JsonRpcSigner) => {
    const maciContract = MaciFactory.connect(process.env.NEXT_PUBLIC_MACI_ADDRESS!, signer);
    const voiceCreditProxyAddress = await maciContract.initialVoiceCreditProxy();
    const voiceCreditProxy = VoiceCreditProxyFactory.connect(voiceCreditProxyAddress, signer);
    const voiceCredits = await voiceCreditProxy.getVoiceCredits(ZeroAddress, "0x0000000000000000000000000000000000000000000000000000000000000000");
    
    return voiceCredits
}