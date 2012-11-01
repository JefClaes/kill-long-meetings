using Cassette;
using Cassette.Scripts;
using Cassette.Stylesheets;

namespace KillLongMeetings
{
    public class CassetteBundleConfiguration : IConfiguration<BundleCollection>
    {
        public void Configure(BundleCollection bundles)
        {
            bundles.AddPerSubDirectory<StylesheetBundle>("Content");
            bundles.AddPerSubDirectory<ScriptBundle>("Content");
        }
    }
}