using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nancy;

namespace MeetingCostTicker
{
    public class RootModule : NancyModule
    {
        public RootModule()
        {
            Get["/"] = p => View["HomeView"];
        }
    }
}