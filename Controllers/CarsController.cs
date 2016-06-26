using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]
    public class CarsController : Controller
    {
        public ICarRepository CarItems { get; set; }
        public CarsController(ICarRepository carItems)
        {
            CarItems = carItems;
        }

        public IEnumerable<Car> GetAll()
        {
            return CarItems.GetAll();
        }

        [HttpGet("{id}", Name = "GetCar")]
        public IActionResult GetById(int id)
        {
            var item = CarItems.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Car item)
        {
            if (item == null)
            {
                return BadRequest();
            }
            CarItems.Add(item);
            return CreatedAtRoute("GetCar", new { controller = "Car", id = item.id }, item);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Car item)
        {
            if (item == null || item.id != id)
            {
                return BadRequest();
            }

            var todo = CarItems.Find(id);
            if (todo == null)
            {
                return NotFound();
            }

            CarItems.Update(item);
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            CarItems.Remove(id);
            return new NoContentResult();
        }
    }
}