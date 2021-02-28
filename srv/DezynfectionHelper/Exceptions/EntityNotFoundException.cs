using System;

namespace DisinfectionHelper.Exceptions
{
    public class EntityNotFoundException : Exception
    {
        public EntityNotFoundException(Type type, int id, Exception inner)
            : base($"Entity of type {type} with id {id} has not been found", inner)
        {
        }

        public EntityNotFoundException(Type type, int id)
           : base($"Entity of type {type} with id {id} has not been found")
        {
        }
    }
}
