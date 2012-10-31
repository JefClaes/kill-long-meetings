using Nancy;

namespace KillLongMeetings
{
    public class RootModule : NancyModule
    {
        public RootModule()
        {
            Get["/"] = p => View["HomeView"];
        }
    }
}