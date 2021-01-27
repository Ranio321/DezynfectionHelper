using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace DisinfectionHelper.Users.Services
{
    public class HashService : IHashService
    {
        public bool CompareHashes(string password, string hash)
        {
            var passwordInfo = hash.Split(".");
            if (passwordInfo.Length != 4 || !int.TryParse(passwordInfo[0], out int iterations))
            {
                return false;
            }

            var hashAlgorithm = Encoding.ASCII.GetString(Convert.FromBase64String(passwordInfo[1]));
            var saltBytes = Convert.FromBase64String(passwordInfo[2]);
            var hashToCompareBytes = Convert.FromBase64String(passwordInfo[3]);

            using (var alg = new Rfc2898DeriveBytes(password, saltBytes, iterations, new HashAlgorithmName(hashAlgorithm)))
            {
                var keyToCheck = alg.GetBytes(hashToCompareBytes.Length);
                return keyToCheck.SequenceEqual(hashToCompareBytes);
            }
        }

        public string Hash(string password)
        {
            using var rfc = new Rfc2898DeriveBytes(password, 16, 1000, new HashAlgorithmName("SHA512"));

            var algorithmName = Convert.ToBase64String(Encoding.ASCII.GetBytes("SHA512"));
            var hash = Convert.ToBase64String(rfc.GetBytes(128));
            var salt = Convert.ToBase64String(rfc.Salt);

            return $"1000.{algorithmName}.{salt}.{hash}";
        }
    }
}
