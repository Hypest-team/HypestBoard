using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace S3
{
    public class Character
    {
        public string name;
        public string icon;

        public override string ToString()
        {
            return name;
        }

    }
    public class Flag
    {
        public string name;
        public string icon;

        public override string ToString()
        {
            return name;
        }
    }
    class CharacterList
    {
        public IList<Character> characters;
    }

    class FlagList
    {
        public IList<Flag> flags;
    }
}
