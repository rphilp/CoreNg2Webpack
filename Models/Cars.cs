using System;
using System.Collections.Generic;
using System.Collections.Concurrent;

namespace WebApplication.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class Car
    {
        public int id { get; set; }
        public string make { get; set; }
        public string model { get; set; }
        public int year { get; set; }
        public string color { get; set; }
        public int price { get; set; }
    }

    public interface ICarRepository
    {
        void Add(Car item);
        IEnumerable<Car> GetAll();
        Car Find(int carId);
        Car Remove(int carId);
        void Update(Car item);
    }

    public class CarRepository : ICarRepository
    {
        static ConcurrentDictionary<int, Car> _cars = 
              new ConcurrentDictionary<int, Car>();

        public CarRepository()
        {
            Add(new Car { id = 0, make = "Toyota", model = "Camry", color = "Red", year = 2011, price = 12000});
            Add(new Car { id = 0, make = "Ford", model = "T", color = "Yellow", year = 2014, price = 15000});
            Add(new Car { id = 0, make = "Chevrolet", model = "Malibu", color = "Black", year = 2012, price = 17000});
            Add(new Car { id = 0, make = "Tesla", model = "S", color = "White", year = 2016, price = 11000});
        }

        public IEnumerable<Car> GetAll()
        {
            return _cars.Values;
        }

        public void Add(Car item)
        {
            item.id = _cars.Count + 1;
            _cars[item.id] = item;
        }

        public Car Find(int carId)
        {
            Car item;
            _cars.TryGetValue(carId, out item);
            return item;
        }

        public Car Remove(int carId)
        {
            Car item;
            _cars.TryGetValue(carId, out item);
            _cars.TryRemove(carId, out item);
            return item;
        }

        public void Update(Car item)
        {
            _cars[item.id] = item;
        }
    }
}