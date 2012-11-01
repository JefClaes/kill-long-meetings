using Nancy;

namespace KillLongMeetings
{
    public class Bootstrapper : DefaultNancyBootstrapper
    {
        public Bootstrapper()
        {
            Cassette.Nancy.CassetteNancyStartup.OptimizeOutput = true;
        }
    }
}