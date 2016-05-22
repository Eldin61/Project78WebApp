using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebProject78.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {

            List<String> fakeUserList = new List<string>();
            fakeUserList.Add("Eldin");
            fakeUserList.Add("Daniel");
            fakeUserList.Add("Orlando");
            fakeUserList.Add("Mark");
            fakeUserList.Add("Rene");

            ViewBag.userList = fakeUserList;
            ViewBag.Title = "Project 78";
            return View();
        }
    }
}