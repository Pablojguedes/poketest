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
    <dialog id="moves-modal" class="w-[90vw] max-w-md p-6 border-none rounded-2xl shadow-2xl backdrop:bg-gray-900/60 open:animate-fade-in">
        <div class="mb-5">
            <h2 class="text-2xl font-extrabold text-gray-800">Ataques</h2>
            <p class="text-sm text-gray-500 mt-1">Escolha até 4 ataques para sua equipe.</p>
        </div>

        <div id="moves-select-div">
        </div>

        <div class="flex justify-end space-x-3 mt-2">
            <button id="modal-close-button" class="px-4 py-2 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors">
                Fechar
            </button>
            <button id="modal-add-button" class="px-4 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none transition-colors shadow-sm" disabled>
                Adicionar
            </button>
        </div>
    </dialog>
    <script src="util.js" type="module"></script>
    <script src="/view/dex-view.js" type="module"></script>
    <script src="/view/modal-view.js" type="module"></script>
    <script src="components/ui-components.js" type="module"></script>
    <script src="components/ui-feedback.js" type="module"></script>
    <script src="index.js" type="module"></script>
    <script src="browser-storage.js" type="module"></script>
    <script src="domain/team.js" type="module"></script>
</body>

</html>