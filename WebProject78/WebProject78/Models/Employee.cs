using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json.Linq;

namespace WebProject78.Models
{
    public class Employee
    {
        private string voornaam;
        private string achternaam;
        private string uid;

        public Employee(string voornaam, string achternaam, string uid, string email, string beschrijving, string telnr)
        {
            this.voornaam = voornaam;
            this.achternaam = achternaam;
            this.uid = uid;
            this.email = email;
            this.beschrijving = beschrijving;
            this.telnr = telnr;
        }

        private string firstName{ get; set; }
        private string lastName { get; set; }
        private string id { get; set; }
        private string email { get; set; }
        private string beschrijving { get; set; }
        private string telnr { get; set; }
    }
}