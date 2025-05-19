import { User } from "../db/models/User";
import { BusinessError } from "../handler/type/errorTypes";
export const userBusinessRules = {
    /**
     * Verilen email adresi ile kayıtlı kullanıcı var mı kontrol eder
     * @param email Kontrol edilecek email adresi
     * @returns Varsa kullanıcı objesi, yoksa null
     */
    async checkIfUserUserExistsByEmail(email: string) {
        return await User.findOne({ email });
    },
    /**
     * Verilen email adresi ile kayıtlı kullanıcı var mı kontrol eder
     * @param email Kontrol edilecek email adresi
     */
    async checkEmailUniqueness(email: string) {
        const existingUser = await this.checkIfUserUserExistsByEmail(email);

        if(existingUser) {
            throw new BusinessError("User already exists");
        }

    }, 
}