<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Pokédex</title>
</head>

<body class="bg-gray-100 p-4">
    <header>
        <h1 class="text-2xl font-bold mb-4">PokéAPI</h1>
    </header>
    <form id="pokemon-form" class="flex space-x-2 items-start">
        <div id="pokemon-input-div" class="flex flex-col">
            <input type="text" id="pokemon-name-input" placeholder="Pikachu, Charizard..." class="border p-2 rounded">
        </div>
        <button id="pokemon-submit-button" type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Buscar</button>
    </form>
    <div id="pokemon-info-div" class="mt-4 p-4 bg-white rounded shadow max-w-[200px] hidden"></div>
    <div id="pokemon-team-section" class="mt-8 p-4 bg-white rounded shadow hidden">
        <h2 class="text-xl font-bold border-b pb-2 mb-4">Minha Equipe</h2>

        <div id="pokemon-team-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        </div>
    </div>
    <script src="util.js" type="module"></script>
    <script src="dex-view.js" type="module"></script>
    <script src="components/ui-components.js" type="module"></script>
    <script src="components/ui-feedback.js" type="module"></script>
    <script src="index.js" type="module"></script>
    <script src="browser-storage.js" type="module"></script>
    <script src="team.js" type="module"></script>
</body>

</html>