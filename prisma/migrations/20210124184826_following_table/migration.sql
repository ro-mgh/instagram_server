-- AddForeignKey
ALTER TABLE "Following" ADD FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
