
import bcrypt from 'bcrypt'

export const hash = async (str: string): Promise<string> => {
  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(str, salt)
  return hash
}

export const verifyHash = async (compStr: string, hashed: string) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(compStr, hashed, (err: any, same: any) => {
      if (err) return reject(err)
      return resolve(same)
    })
  })
}