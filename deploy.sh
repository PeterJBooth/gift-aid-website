echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* peter@138.68.154.123:/var/www/138.68.154.123/

echo "Done"

