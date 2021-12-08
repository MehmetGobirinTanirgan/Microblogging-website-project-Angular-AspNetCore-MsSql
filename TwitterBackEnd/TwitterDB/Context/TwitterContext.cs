using Microsoft.EntityFrameworkCore;
using System.Reflection;
using TwitterCore.Models;

namespace TwitterDB.Context
{
    public class TwitterContext : DbContext
    {
        public TwitterContext(DbContextOptions<TwitterContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            modelBuilder.Seed();
        }

        public DbSet<Admin> Admins { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Tweet> Tweets { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Agenda> Agendas { get; set; }
        public DbSet<Follow> Follows { get; set; }
        public DbSet<HashTag> HashTags { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<TopicCategory> TopicCategories { get; set; }
        public DbSet<TweetHashTag> TweetsAndHashTags { get; set; }
        public DbSet<TweetMention> TweetsAndMentions { get; set; }
        public DbSet<TweetImage> TweetImages { get; set; }
    }
}
